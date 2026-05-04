-- Make phone required and validated
ALTER TABLE public.project_requests
  ALTER COLUMN phone SET NOT NULL;

DROP POLICY IF EXISTS "Anyone can submit a project request" ON public.project_requests;

CREATE POLICY "Anyone can submit a project request"
ON public.project_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(full_name) >= 2 AND length(full_name) <= 100
  AND length(email) >= 3 AND length(email) <= 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(phone) >= 5 AND length(phone) <= 40
  AND project_type = ANY (ARRAY['Mobile App'::text, 'Website'::text, 'Both'::text, 'Custom'::text])
  AND length(budget_range) >= 1 AND length(budget_range) <= 80
  AND length(timeline) >= 1 AND length(timeline) <= 80
  AND length(description) >= 10 AND length(description) <= 4000
);