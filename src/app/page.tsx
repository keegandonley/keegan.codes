import Image from "next/image";
import { Raleway } from "next/font/google";
import styles from "./page.module.css";
import { Avatar } from "@/components/Avatar";
import { HeroText } from "@/components/Hero/Text";
import { HeroBlock } from "@/components/Hero/Block";
import { Divider } from "@/components/Divider";

const font = Raleway({ subsets: ["latin"], weight: "200" });

export default function Home() {
  return (
    <main className={font.className}>
      <HeroBlock>
        <Avatar width={150} />
        <HeroText>Keegan Donley</HeroText>
      </HeroBlock>
      <Divider />
    </main>
  );
}
