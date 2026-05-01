-- Remove policies that depended on has_role
DROP POLICY IF EXISTS "Admins can view project requests" ON public.project_requests;
DROP POLICY IF EXISTS "Admins can update project requests" ON public.project_requests;
DROP POLICY IF EXISTS "Admins can delete project requests" ON public.project_requests;

-- Drop user_roles table and its policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP TABLE IF EXISTS public.user_roles;

-- Drop the role-checking function and enum
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP TYPE IF EXISTS public.app_role;

-- project_requests now only has the public INSERT policy already in place.
-- No SELECT/UPDATE/DELETE policy = nobody can read/modify via the JS client.
-- Reading is done from Lovable Cloud dashboard (service role).