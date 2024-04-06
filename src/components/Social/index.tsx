import {
  blueSkyBlue,
  githubGrey,
  githubGreyLight,
  instagramOrange,
  linkedInBlue,
  redditOrange,
  xGrey,
  xGreyLight,
} from '@/theme/brandColors';
import styles from './social.module.css';
import { URLS } from './socials';
import { Icon } from './Icon';
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faReddit,
  faXTwitter,
  faBluesky,
} from '@fortawesome/free-brands-svg-icons';

export const Social = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icons}>
        <Icon
          icon={faBluesky}
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
          name="X"
        />
        <Icon
          icon={faReddit}
          color={redditOrange}
          url={URLS.reddit}
          name="Reddit"
        />
      </div>
    </div>
  );
};
