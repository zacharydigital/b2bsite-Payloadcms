import CmsLoginForm from "./CmsLoginForm";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CmsLoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const redirectParam = params.redirect;
  const redirect = Array.isArray(redirectParam) ? redirectParam[0] : redirectParam;

  return <CmsLoginForm redirectTo={redirect || "/admin"} />;
}
