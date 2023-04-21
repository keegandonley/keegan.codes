import { Body, EmbedScript, EmbedTarget, Intro } from "@/components/Calendly";

export const runtime = "experimental-edge";

export default function ChatMarketResearchPage() {
  return (
    <Intro>
      <Body>
        Use the form below to schedule a <strong>market research</strong> call
        with me! Please note that the calendar has times in hourly blocks, and
        if we&apos;ve agreed on a longer chat just be sure to add that in the
        notes.
      </Body>
      <EmbedTarget meeting="market-research" />
      <EmbedScript />
    </Intro>
  );
}