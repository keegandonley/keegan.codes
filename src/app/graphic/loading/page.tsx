"use client";

import { Paragraph } from "@/components/Paragraph";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicWaves = dynamic(
  () => import("@/components/Waves").then((mod) => mod.Waves),
  {
    ssr: false,
  }
);

export default function LoadingGraphicPage() {
  return (
    <div>
      <Paragraph>
        <small>
          <em>This page intentionally left blank</em>
        </small>
      </Paragraph>
      <Suspense>
        <DynamicWaves force />
      </Suspense>
    </div>
  );
}
