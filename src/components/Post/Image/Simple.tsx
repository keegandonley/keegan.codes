import Image from "next/image";
import simpleStyles from "./simple.module.css";
import { injectVariables, merge } from "@/util/classNames";

export const SimpleImg = ({ src, width, height, alt }: any) => {
  return (
    <div
      className={simpleStyles.parent}
      style={injectVariables([
        ["width", `${width}px`],
        ["height", `${height}px`],
      ])}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={merge(simpleStyles.img)}
        style={{
          filter: "drop-shadow(0 0 0.5rem var(--shadow-color))",
        }}
      />
    </div>
  );
};
