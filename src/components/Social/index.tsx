import {
  blueSkyBlue,
  githubGrey,
  githubGreyLight,
  instagramOrange,
  linkedInBlue,
  twitterBlue,
} from "@/theme/brandColors";
import styles from "./social.module.css";
import { URLS } from "./socials";
import { Icon } from "./Icon";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCloudRainbow,
  faCloudSun,
  faClouds,
  faCloudsSun,
} from "@fortawesome/pro-solid-svg-icons";

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
          icon={faTwitter}
          color={twitterBlue}
          url={URLS.twitter}
          name="Twitter"
        />
      </div>
    </div>
  );
};
