import { redirect } from "next/navigation";

export const runtime = "edge";

interface RestProps {
  params: {
    shortCode: string;
    rest: string[];
  };
}

export default async function ShortCodeRest(props: RestProps) {
  console.log("routing handler props were", props);
  const fullUrl = props.params.rest?.length
    ? `${props.params.shortCode}/${props.params.rest.join("/")}`
    : props.params.shortCode;
  return redirect(`/routing-error?slug=${fullUrl}&type=page`);
}
