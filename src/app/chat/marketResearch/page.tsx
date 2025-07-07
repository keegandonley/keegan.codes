import { Body, Intro } from '@/components/Calendly';
import EmbedTarget from '@/components/Calendly/EmbedTarget';

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
    </Intro>
  );
}
