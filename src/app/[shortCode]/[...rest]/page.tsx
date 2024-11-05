import { redirect } from 'next/navigation';

export const runtime = 'edge';

interface RestProps {
  params: Promise<{
    shortCode: string;
    rest: string[];
  }>;
}

export default async function ShortCodeRest(props: RestProps) {
  console.log('routing handler props were', props);

  const params = await props.params;
  const fullUrl = params.rest?.length
    ? `${params.shortCode}/${params.rest.join('/')}`
    : params.shortCode;
  return redirect(`/routing-error?slug=${fullUrl}&type=page`);
}
