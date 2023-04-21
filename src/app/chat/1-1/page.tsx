import { Body, EmbedScript, EmbedTarget, Intro } from "@/components/Calendly";

export const runtime = "experimental-edge";

export default function ChatOneOnOnePage() {
  return (
    <Intro>
      <Body>
        Use the form below to schedule a 45 minute <strong>1:1</strong> call
        with me! This can be used for networking, catching up, or anything else!
      </Body>
      <EmbedTarget meeting="1-1" />
      <EmbedScript />
    </Intro>
  );
}