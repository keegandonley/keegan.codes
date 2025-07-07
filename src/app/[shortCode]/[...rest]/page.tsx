import { redirect } from 'next/navigation';

interface RestProps {
  params: Promise<{
    shortCode: string;
    rest: string[];
  }>;
}

export default async function ShortCodeRest(props: RestProps) {
  const params = await props.params;
  const fullUrl = params.rest?.length
    ? `${params.shortCode}/${params.rest.join('/')}`
    : params.shortCode;

  return redirect(`/routing-error?slug=${fullUrl}&type=page`);
}
