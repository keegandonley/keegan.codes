import { Body, EmbedScript, EmbedTarget, Intro } from "@/components/Calendly";

export default function ChatCareerPage() {
  return (
    <Intro>
      <Body>
        Use the form below to schedule a 30 minute <strong>career chat</strong>{" "}
        with me! We can talk about software careers, interviewing, college, you
        name it! I can&apos;t promise to have any earth-shattering advice, but
        I&apos;m happy to chat!
      </Body>
      <EmbedTarget meeting="career-chat" />
      <EmbedScript />
    </Intro>
  );
}
