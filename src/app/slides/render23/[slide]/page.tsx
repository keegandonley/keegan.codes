import { notFound } from "next/navigation";
import Slides from "./content";
import styles from "./slide.module.css";
import { merge } from "@/util/classNames";

interface SlideProps {
  params: {
    slide: string;
  };
}

const order = [Slides.Intro, Slides.NpmSecurityIntro];

export default function Render2023SlidePage({ params: { slide } }: SlideProps) {
  const slideIndex = parseInt(slide, 10);

  if (!order[slideIndex]) {
    notFound();
  }

  const Slide = order[slideIndex].default;

  return (
    <div>
      <main className={merge(styles.main)}>
        <Slide />
      </main>
    </div>
  );
}
