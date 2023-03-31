import {
  githubGrey,
  instagramOrange,
  linkedInBlue,
  twitterBlue,
} from "@/theme/brandColors";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./social.module.css";
import Link from "next/link";
import { URLS } from "./socials";
import { Icon } from "./Icon";

export const Social = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icons}>
        <Icon icon={faTwitter} color={twitterBlue} url={URLS.twitter} />
        <Icon icon={faGithub} color={githubGrey} url={URLS.github} />
        <Icon icon={faLinkedin} color={linkedInBlue} url={URLS.linkedIn} />
        <Icon icon={faInstagram} color={instagramOrange} url={URLS.instagram} />
      </div>
    </div>
  );
};
