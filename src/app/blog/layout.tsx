import { AnimatedGraph } from "@/components/AnimatedGraph";

export default function BlogLayout({ children, modal }: any) {
  return (
    <>
      {modal}
      {children}
      <AnimatedGraph />
    </>
  );
}
