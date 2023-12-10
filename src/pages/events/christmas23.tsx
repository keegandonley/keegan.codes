import styles from "./christmas23.module.css";
import { merge } from "@/util/classNames";
import "./christmas23.css";
import Image from "next/image";
import girlstartlogo from "@/images/girlstart.png";
import localFont from "next/font/local";

const dosis = localFont({
  src: [
    {
      path: "../Dosis.ttf",
      style: "normal",
    },
  ],
});

export default function Christmas23() {
  return (
    <div className={merge(dosis.className, styles.wrapper)}>
      <h1 className={merge(styles.title)}>
        Welcome to Keegan and Jully&apos;s 23rd annual Christmas Party!
      </h1>
      <article className={merge(styles.content)}>
        <p>We&apos;re so happy you could join us this evening!</p>
        <p>
          This year, we are raising money for a non-profit called{" "}
          <strong>GirlStart</strong>. This is a great organization that supports
          young girls in STEM by offering year-round after-school programs.
        </p>
        <p>
          We ask this year that if you&apos;re able, please consider joining us
          in supporting this organization through our{" "}
          <a href="/girlstart" target="_blank" rel="noopener noreferrer">
            fundraiser for this event
          </a>
          .
        </p>
        <Image src={girlstartlogo} alt="GirlStart" />
        <hr className={merge(styles.divider)} />
        <h3>Wifi Information</h3>
        <p className={styles.entry}>
          Network: <code>Christmas23</code>
        </p>
        <p className={styles.entry}>
          Password: <code>girlstart</code>
        </p>
      </article>
    </div>
  );
}
