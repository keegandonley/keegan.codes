import { merge } from "@/util/classNames";
import Link from "next/link";
import localFont from "next/font/local";
import styles from "@/pageStyles/miami24/miami.module.css";
import Image from "next/image";
import linkedIn from "@/images/linkedin-miami.svg";
import X from "@/images/x-twitter-miami.svg";
import "@/tw.css";

const yellowTail = localFont({
  src: [
    {
      path: "../../sharedFonts/Yellowtail.ttf",
      style: "normal",
    },
  ],
});

const bungee = localFont({
  src: [
    {
      path: "../../sharedFonts/Bungee.ttf",
      style: "normal",
    },
  ],
});

const comfortaa = localFont({
  src: [
    {
      path: "../../sharedFonts/Comfortaa.ttf",
      style: "normal",
    },
  ],
});

export default function Miami24Neon() {
  return (
    <>
      <div className={merge(`min-h-dvh bg-black`)}>
        <div className="max-w-[1000px] mx-auto flex flex-col items-center justify-center text-center px-5 z-50">
          <div className="h-10" />
          <h1
            className={merge(
              `text-[5rem] md:text-[8rem] leading-[6rem] sm:leading-normal font-bold`,
              styles.neon,
              bungee.className
            )}
          >
            Hi there!
          </h1>
          <h2
            className={merge(
              `text-[3.5rem] md:text-[5rem] mt-[-2.5rem] md:mt-[-5rem]`,
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
            <Link
              href="https://kizen.com"
              target="_blank"
              className="text-neon-blue"
            >
              <strong>Kizen</strong>
            </Link>
            . I love all things React, Next.js, and performant web!
          </p>
          <div className="h-8" />
          <div className="flex gap-12">
            <Link href={"/linkedin"}>
              <Image
                src={linkedIn}
                alt="LinkedIn"
                className="inline mb-1"
                height={30}
                width={30}
                priority
              />
            </Link>
            <Link href={"/twitter"}>
              <Image
                src={X}
                alt="X (Twitter)"
                className="inline mb-1"
                height={30}
                width={30}
                priority
              />
            </Link>
          </div>
          <div className="h-8" />
          <p
            className={merge(
              `text-white text-xl w-4/5 border-solid border-neon-blue border-2 rounded-lg p-6`,
              comfortaa.className
            )}
          >
            I write a{" "}
            <Link href="/blog" className="text-neon-pink">
              <strong>blog</strong>
            </Link>{" "}
            about a number of topics, ranging from software to fitness to
            travel.
          </p>
        </div>
        <div className="h-12" />
        {/* <div className="fixed left-0 right-0 bottom-0">
          <svg
            className="absolute left-[-24px] bottom-[-8px] text-miami-pink w-[200px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M112 96H62.2c0-36 38.4-96 128-96c58.4 0 95 25.5 113.5 53.2C323.6 40.6 350.2 32 384 32c89.6 0 128 60 128 96H448L416 96l-32 32H301.5c28 79.9 21.2 170.2 9.9 226.1C370.9 365.1 416 417.3 416 480v32H32V480c0-70.7 57.3-128 128-128h64c29.7-79.3 29.4-150.9 22.8-194l-98.9 98.9c-25.5-25.5-40.7-95 22.6-158.4c1.3-1.3 2.7-2.7 4.1-3.9L144 64 112 96z"
            />
          </svg>
          <svg
            className="absolute left-[-30px] bottom-[-4px] text-miami-blue w-[200px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M112 96H62.2c0-36 38.4-96 128-96c58.4 0 95 25.5 113.5 53.2C323.6 40.6 350.2 32 384 32c89.6 0 128 60 128 96H448L416 96l-32 32H301.5c28 79.9 21.2 170.2 9.9 226.1C370.9 365.1 416 417.3 416 480v32H32V480c0-70.7 57.3-128 128-128h64c29.7-79.3 29.4-150.9 22.8-194l-98.9 98.9c-25.5-25.5-40.7-95 22.6-158.4c1.3-1.3 2.7-2.7 4.1-3.9L144 64 112 96z"
            />
          </svg>
          <svg
            className="absolute left-[-38px] bottom-0 text-miami-yellow w-[200px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M112 96H62.2c0-36 38.4-96 128-96c58.4 0 95 25.5 113.5 53.2C323.6 40.6 350.2 32 384 32c89.6 0 128 60 128 96H448L416 96l-32 32H301.5c28 79.9 21.2 170.2 9.9 226.1C370.9 365.1 416 417.3 416 480v32H32V480c0-70.7 57.3-128 128-128h64c29.7-79.3 29.4-150.9 22.8-194l-98.9 98.9c-25.5-25.5-40.7-95 22.6-158.4c1.3-1.3 2.7-2.7 4.1-3.9L144 64 112 96z"
            />
          </svg>
        </div> */}
      </div>
    </>
  );
}

// bg-gradient-to-b from-miami-blue via-miami-pink to-miami-yellow
