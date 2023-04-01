import { HeroText } from "@/components/Hero/Text";
import { HeroBlock } from "@/components/Hero/Block";
import { Divider } from "@/components/Divider";
import { Social } from "@/components/Social";
import { Paragraph } from "@/components/Paragraph";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/pro-solid-svg-icons";

export default function Home() {
  return (
    <>
      <HeroBlock isHomePage>
        <HeroText>Keegan Donley</HeroText>
      </HeroBlock>
      <Divider />
      <Social />
      <section>
        <Paragraph>
          Hi there! I&apos;m a <strong>full-stack engineer</strong> located in
          Austin, Texas.
        </Paragraph>
        <Paragraph>
          I love solving challenging problems for the web, and building
          applications that are performant, accessible, and easy to use.
        </Paragraph>
        <Paragraph>
          I&apos;m currently working as a{" "}
          <strong>principal front-end engineer</strong> at{" "}
          <Link href="https://kizen.com">Kizen</Link>.
        </Paragraph>
        <Paragraph>
          <Link href="/blog">
            <FontAwesomeIcon icon={faNewspaper} /> <strong>Read my blog</strong>
          </Link>
        </Paragraph>
      </section>
    </>
  );
}
