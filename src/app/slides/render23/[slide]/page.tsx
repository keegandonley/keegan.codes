import { redirect } from 'next/navigation';
import Slides from './content';
import styles from './slide.module.css';
import { merge } from '@/util/classNames';
import '../../../syntax-theme.css';

interface SlideProps {
  params: Promise<{
    slide: string;
  }>;
}

const order = [
  Slides.Intro,
  Slides.Topics,
  Slides.NpmSecurityIntro,
  Slides.CopilotTips,
  Slides.CopilotNpm,
  Slides.CSSMain,
  Slides.MediaRangeSyntax,
  Slides.ContainterQueries,
  Slides.ColorMix,
  Slides.Intro,
];

export default async function Render2023SlidePage(props: SlideProps) {
  const params = await props.params;

  const slideIndex = parseInt(params.slide, 10);

  if (!order[slideIndex]) {
    redirect('/slides/render23/0');
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
