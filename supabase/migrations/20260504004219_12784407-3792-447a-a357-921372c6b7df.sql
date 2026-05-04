DROP POLICY IF EXISTS "Anyone can submit a project request" ON public.project_requests;

CREATE POLICY "Anyone can submit a project request"
ON public.project_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(full_name) BETWEEN 2 AND 100
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(phone) BETWEEN 5 AND 40
  AND length(project_type) BETWEEN 1 AND 80
  AND length(budget_range) BETWEEN 1 AND 80
  AND length(timeline) BETWEEN 1 AND 80
  AND length(description) BETWEEN 10 AND 4000
);