import {
  blueSkyBlue,
  githubGrey,
  githubGreyLight,
  instagramOrange,
  linkedInBlue,
  twitterBlue,
  xGrey,
  xGreyLight,
} from "@/theme/brandColors";
import styles from "./social.module.css";
import { URLS } from "./socials";
import { Icon } from "./Icon";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCloudRainbow } from "@fortawesome/pro-solid-svg-icons";

export const Social = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icons}>
        <Icon
          icon={faCloudRainbow}
          color={blueSkyBlue}
          url={URLS.bluesky}
          name="Bluesky"
        />
        <Icon
          icon={faGithub}
          color={githubGrey}
          darkColor={githubGreyLight}
          url={URLS.github}
          name="Github"
        />
        <Icon
          icon={faLinkedin}
          color={linkedInBlue}
          url={URLS.linkedIn}
          name="LinkedIn"
        />
        <Icon
          icon={faInstagram}
          color={instagramOrange}
          url={URLS.instagram}
          name="Instagram"
        />
        <Icon
          icon={faXTwitter}
          color={xGrey}
          darkColor={xGreyLight}
          url={URLS.twitter}
          name="Twitter"
        />
      </div>
    </div>
  );
};
