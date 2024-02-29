import { merge } from "@/util/classNames";
import "./tw.css";
import Link from "next/link";
import localFont from "next/font/local";
import styles from "./miami.module.css";
import Image from "next/image";
import linkedIn from "./linkedin.svg";
import X from "./x-twitter.svg";

const yellowTail = localFont({
  src: [
    {
      path: "./Yellowtail.ttf",
      style: "normal",
    },
  ],
});

const bungee = localFont({
  src: [
    {
      path: "./Bungee.ttf",
      style: "normal",
    },
  ],
});

const comfortaa = localFont({
  src: [
    {
      path: "./Comfortaa.ttf",
      style: "normal",
    },
  ],
});

export default function miami24() {
  return (
    <>
      <div className={merge(`min-h-dvh bg-black`)}>
        <div className="max-w-[1000px] mx-auto flex flex-col items-center justify-center text-center px-5 z-50">
          <div className="h-10" />
          <h1
            className={merge(
              `text-[13vw] font-bold`,
              styles.neon,
              bungee.className
            )}
          >
            Hi there!
          </h1>
          <h2
            className={merge(
              `text-[7vw] mt-[-9vw]`,
              yellowTail.className,
              styles.neonPink
            )}
          >
            Nice to meet you!
          </h2>
          <div className="h-5" />
          <p
            className={merge(
              `text-white text-xl w-4/5 border-solid border-neon-pink border-2 rounded-lg p-6`,
              comfortaa.className
            )}
          >
            My name is <strong>Keegan Donley</strong>, and I&apos;m currently a
            principal front-end engineer at{" "}
            <Link href="https://kizen.com" target="_blank">
              <strong>Kizen</strong>
            </Link>
            . I love all things React, NextJS, and performant web!
          </p>
          <div className="h-12" />
          <p
            className={merge(
              `text-white text-xl w-4/5 border-solid border-neon-blue border-2 rounded-lg p-6`,
              comfortaa.className
            )}
          >
            I&apos;d love to connect on{" "}
            <Link href={"/linkedin"} className="">
              <Image
                src={linkedIn}
                alt="LinkedIn"
                className="inline mb-1 grayscale"
                height={20}
                width={20}
                priority
              />{" "}
              <strong>LinkedIn</strong>
            </Link>{" "}
            or{" "}
            <Link href={"/twitter"} className="grayscale">
              <Image
                src={X}
                alt="X (Twitter)"
                className="inline mb-1"
                height={20}
                width={20}
                priority
              />
            </Link>
            !
            <br />
            <br />I also write a{" "}
            <Link href="/blog" className="text-neon-pink">
              <strong>blog</strong>
            </Link>{" "}
            about a number of topics, ranging from software to fitness to
            travel.
          </p>
        </div>
        <div className="h-12" />
      </div>
    </>
  );
}

// bg-gradient-to-b from-miami-blue via-miami-pink to-miami-yellow
