-- Lock down reads/updates/deletes on project_requests.
-- Public form keeps INSERT access. All reads happen via Lovable Cloud (service role bypasses RLS).

CREATE POLICY "No public read access to project requests"
ON public.project_requests
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "No public updates to project requests"
ON public.project_requests
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No public deletes from project requests"
ON public.project_requests
FOR DELETE
TO anon, authenticated
USING (false);