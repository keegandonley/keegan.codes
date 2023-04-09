import { injectVariables } from "@/util/classNames";
import styles from "./banner.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Banner = ({
  level = 1,
  children,
  icon,
}: {
  level: number;
  children: any;
  icon?: IconProp;
}) => {
  return (
    <div
      className={styles.banner}
      style={injectVariables([["banner-level-rems", `${level}rem`]])}
    >
      {icon ? (
        <div className="iconContainer">
          <FontAwesomeIcon icon={icon} />
        </div>
      ) : null}
      {children}
    </div>
  );
};
