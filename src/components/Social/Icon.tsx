import { ElementBaseProps } from "@/types/elements";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./social.module.css";
import { injectVariables } from "@/util/classNames";

interface SocialIconProps extends ElementBaseProps {
  url: string;
  icon: IconDefinition;
  color: string;
  darkColor?: string;
  name: string;
}

export const Icon = ({
  url,
  className,
  icon,
  color,
  darkColor,
  name,
}: Omit<SocialIconProps, "children">) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`Keegan Donley's ${name}`}
    >
      <FontAwesomeIcon
        icon={icon}
        color={color}
        className={styles.icon}
        style={injectVariables([["darkColor", darkColor]])}
      />
    </Link>
  );
};
