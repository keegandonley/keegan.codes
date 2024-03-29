import { merge } from "@/util/classNames";
import "@/tw.css";
import Image from "next/image";
import background from "../../images/miami24/background.jpg";
import palm from "../../images/miami24/palm.png";
import localFont from "next/font/local";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/pro-solid-svg-icons";

const yellowTail = localFont({
  src: [
    {
      path: "../../sharedFonts/Yellowtail.ttf",
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

export default function Miami24() {
  const [theme, setTheme] = useState<"day" | "night">("day");

  const dayOceanClassNames = merge("");
  const nightOceanClassNames = merge(
    "hue-rotate-120 brightness-50 contrast-150 saturate-75"
  );
  const oceanClassNames =
    theme === "day" ? dayOceanClassNames : nightOceanClassNames;

  const dayOverlayClassNames = merge("bg-sand opacity-60");
  const nightOverlayClassNames = merge("bg-gray-900 opacity-70");
  const overlayClassNames =
    theme === "day" ? dayOverlayClassNames : nightOverlayClassNames;

  const dayBodyTextClassNames = merge("text-gray-700");
  const nightBodyTextClassNames = merge("text-gray-200");
  const bodyTextClassNames =
    theme === "day" ? dayBodyTextClassNames : nightBodyTextClassNames;

  const treeDayClassNames = merge("brightness-200 saturate-50");
  const treeNightClassNames = merge("brightness-50 contrast-125");
  const treeClassNames =
    theme === "day" ? treeDayClassNames : treeNightClassNames;

  const animationClassNames = merge("transition-all");

  const bottomFadeDayClassNames = merge(
    "bg-gradient-to-b from-transparent via-sand to-sand"
  );
  const bottomFadeNightClassNames = merge(
    "bg-gradient-to-b from-transparent via-gray-900 to-gray-900"
  );
  const bottomFadeClassNames =
    theme === "day" ? bottomFadeDayClassNames : bottomFadeNightClassNames;

  const handleClick = () => {
    setTheme((t) => (t === "day" ? "night" : "day"));
  };

  return (
    <div className={merge("min-h-dvh max-h-dvh bg-sand")}>
      <button
        className="fixed right-[15px] top-[15px] z-10"
        onClick={handleClick}
      >
        {theme === "day" ? (
          <FontAwesomeIcon
            icon={faMoon}
            className="text-gray-600 text-4xl"
            fixedWidth
          />
        ) : (
          <FontAwesomeIcon
            icon={faSun}
            className="text-yellow-500 text-4xl"
            fixedWidth
          />
        )}
      </button>
      <div className="fixed left-0 right-0 top-[-150px] h-[1000px] pointer-events-none">
        <Image
          src={background}
          alt="Beach"
          layout="fill"
          className={merge(
            "sepia-80 bg-cover bg-top",
            animationClassNames,
            oceanClassNames
          )}
        />
        <div
          className={merge(
            "absolute left-0 right-0 top-0 bottom-0",
            animationClassNames,
            overlayClassNames
          )}
        ></div>
      </div>
      <div className="z-10 relative pt-[244px] sm:pt-[218px] pr-4 text-right flex flex-col pointer-events-none">
        <span
          className={merge(
            yellowTail.className,
            "text-[4rem] sm:text-[6rem] pr-4 text-pink-500 p-0 m-0 leading-none"
          )}
        >
          Hi There!
        </span>
        <span
          className={merge(
            yellowTail.className,
            "leading-none text-blue-600 text-[3rem] mt-[-13px] sm:mt-[-18px] pr-12 sm:pr-16"
          )}
        >
          Nice to meet you!
        </span>
        <p
          className={merge(
            "w-3/4 sm:w-1/2 ml-auto pt-6 pr-6 text-2xl font-bold",
            bodyTextClassNames,
            animationClassNames,
            comfortaa.className
          )}
        >
          My name is Keegan Donley, and I&apos;m currently a principal font-end
          engineer at{" "}
          <Link href="https://kizen.com" className="text-blue-600">
            Kizen
          </Link>
          .
        </p>
        <p
          className={merge(
            "w-1/2 ml-auto pt-6 pr-6 text-2xl font-bold pb-12",
            bodyTextClassNames,
            animationClassNames,
            comfortaa.className
          )}
        >
          I love all things React, NextJS, and performant web, and write a{" "}
          <Link className="text-blue-600" href="/blog">
            blog
          </Link>{" "}
          about a number of topics, ranging from software to fitness to travel.
        </p>
      </div>
      <div
        className={merge(
          "fixed bottom-0 left-0 right-0 h-1/3 sm:h-1/4",
          bottomFadeClassNames
        )}
      />
      <div className="fixed left-0 bottom-0 top-0 w-[200%] pointer-events-none">
        <div className="relative w-full h-full">
          <div className="absolute left-[-40px] sm:left-[-20px] top-[10px] sm:top-[20px] bottom-[-10px] sm:bottom-[-20px]">
            <Image
              src={palm}
              alt="Palm"
              className={merge(
                "h-full w-auto min-w-0 drop-shadow-lg hue-rotate-30 select-none pointer-events-none",
                animationClassNames,
                treeClassNames
              )}
            />
          </div>
          <div className="absolute left-[-130px] sm:left-[-70px] top-[180px] sm:top-[90px] bottom-[-180px] sm:bottom-[-90px]">
            <Image
              src={palm}
              alt="Palm"
              className={merge(
                "h-full w-auto drop-shadow-lg hue-rotate-45 select-none pointer-events-none",
                animationClassNames,
                treeClassNames
              )}
            />
          </div>
          <div className="absolute left-[-120px] sm:left-[-40px] top-[400px] bottom-[-400px] sm:top-[300px] sm:bottom-[-300px]">
            <Image
              src={palm}
              alt="Palm"
              className={merge(
                "h-full w-auto drop-shadow-lg hue-rotate-60 select-none pointer-events-none",
                animationClassNames,
                treeClassNames
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
