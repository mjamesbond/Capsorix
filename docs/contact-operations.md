# Contact lead system operations

## Readiness states

- **Code-complete:** migration, Edge Function, client contract, automated tests, and pull-request quality checks are present in this repository.
- **Infrastructure-configured:** pending until the migration, GitHub variables, Supabase secrets, and Resend sender verification below are completed.
- **Production-smoke-tested:** pending. A local or CI build does not prove database persistence or email delivery.

## Configuration boundaries

GitHub Pages/Vite build variables are public browser configuration: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and `VITE_SUPABASE_PROJECT_ID`. Configure all three as GitHub Actions repository variables. Never put a service-role key or Resend key in a `VITE_` variable.

The production Pages workflow fails before building when any required public Supabase variable is missing or when the Supabase URL is not HTTPS. The pull-request workflow uses clearly fake public test values so code quality can be checked without production credentials.

The Edge Function receives `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` automatically from Supabase. Set these function-only secrets:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` (for example, `Capsorix Contact <contact@notify.capsorix.tech>`)
- `CONTACT_ALLOWED_ORIGINS` (comma-separated exact origins; no paths or wildcards)
- `CONTACT_RATE_LIMIT_SALT` (a random value of at least 32 characters; the documented command generates 32 random bytes)

`CONTACT_FROM_EMAIL` **must use a sender domain verified in Resend**. In the Resend dashboard, add the sender domain and publish the exact SPF and DKIM DNS records Resend provides; wait for a verified status. Configure DMARC according to the domain owner's policy. No visitor acknowledgement is sent: this deliberately avoids making the public endpoint an email relay.

Internal notification requests use a stable Resend idempotency key derived from the canonical Capsorix reference. This permits a bounded provider retry without sending duplicate internal notifications. Replays of an already stored browser submission are resolved before consuming another durable rate-limit slot.

## Deployment

From an authenticated Supabase CLI at the repository root:

```bash
export PROJECT_REF='<your-project-ref>'
supabase link --project-ref "$PROJECT_REF"
supabase db push --linked
openssl rand -hex 32 # copy output; do not commit it
supabase secrets set --project-ref "$PROJECT_REF" \
  RESEND_API_KEY='re_replace_me' \
  CONTACT_FROM_EMAIL='Capsorix Contact <contact@verified-domain.example>' \
  CONTACT_ALLOWED_ORIGINS='https://capsorix.tech,https://www.capsorix.tech' \
  CONTACT_RATE_LIMIT_SALT='<random-hex-output>'
supabase functions deploy contact-email --project-ref "$PROJECT_REF"
supabase functions list --project-ref "$PROJECT_REF"
```

Confirm the displayed `contact-email` deployment time/version before testing. Set the three public GitHub variables, then deploy the Pages build containing the matching project URL/key.

## Required deployment order

Use this order to avoid an avoidable production outage:

1. Verify the Resend sender domain and prepare the four Edge Function secret values.
2. Apply the database migration.
3. Deploy the new `contact-email` Edge Function.
4. Run the direct controlled function smoke test below.
5. Configure the three GitHub repository variables.
6. Merge the reviewed pull request and allow the Pages workflow to deploy.
7. Run one final submission through the deployed website UI.

The Edge Function accepts the legacy payload that omits `submission_id`, so steps 2–4 can be completed before the new frontend is deployed.

## Controlled production smoke test

Use an address controlled by the tester and one UUID once. Do not use a third-party address.

```bash
export FUNCTION_URL='https://<project-ref>.supabase.co/functions/v1/contact-email'
export PUBLISHABLE_KEY='<publishable-key>'
export SUBMISSION_ID="$(python3 -c 'import uuid; print(uuid.uuid4())')"
curl --fail-with-body -i "$FUNCTION_URL" \
  -H 'Origin: https://capsorix.tech' \
  -H "apikey: $PUBLISHABLE_KEY" \
  -H "Authorization: Bearer $PUBLISHABLE_KEY" \
  -H 'Content-Type: application/json' \
  --data "{\"submission_id\":\"$SUBMISSION_ID\",\"full_name\":\"Capsorix production smoke test\",\"email\":\"<controlled-address>\",\"phone\":\"+10000000000\",\"project_type\":\"Website\",\"budget_range\":\"Smoke test\",\"timeline\":\"Smoke test\",\"description\":\"Controlled production verification; no response required.\",\"honeypot\":\"\"}"
```

Repeat that exact curl command with the same `SUBMISSION_ID`. It must return the same reference and `"duplicate":true`. Because duplicate lookup occurs before throttling, this replay should not consume a second rate-limit slot. In Supabase SQL Editor, substitute the UUID:

```sql
select public_reference, submission_id, delivery_status, provider_message_id, email_sent_at, delivery_error_code
from public.project_requests where submission_id = '<submission-id>';
```

Confirm exactly one row, matching reference, `sent`, a provider ID, and an email timestamp. In Resend confirm one internal message, recipient `team@capsorix.tech`, and Reply-To equal to the controlled visitor address. Confirm delivery in the team mailbox. Finally submit once through the deployed UI and confirm its receipt shows the API reference. If delivery is `delayed`, inspect function logs by public reference only; provider error bodies and contact details are intentionally not logged.

## Public response contract

| HTTP | Meaning | Body fields |
| --- | --- | --- |
| `200` | Stored and notified, or idempotent replay | `accepted:true`, `reference`, `delivery:"sent"`, `duplicate` |
| `202` | Stored, notification delayed | `accepted:true`, `reference`, `delivery:"delayed"`, `duplicate:false`, `code:"NOTIFICATION_DELAYED"` |
| `422` | Validation failure | `accepted:false`, stable `code`, safe `message` |
| `429` | Durable rate limit | `accepted:false`, `code:"RATE_LIMITED"`, safe `message` |
| `403` | Origin rejected | `accepted:false`, `code:"ORIGIN_NOT_ALLOWED"` |
| `503` | Persistence/configuration/throttling unavailable | `accepted:false`, stable `code`, safe `message` |

The public reference is canonical; internal row IDs, raw IP addresses, secrets, and raw provider errors never appear in responses or logs.
