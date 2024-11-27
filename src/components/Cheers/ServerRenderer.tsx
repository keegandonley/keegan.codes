import { CheersClientRenderer } from './ClientRenderer';
import styles from './cheers.module.css';
import { getCheersCountForSlug } from '@/util/db';

interface CheersServerRendererProps {
  slug: string;
  location: string;
}

export const CheersServerRenderer = async ({
  slug,
  location,
}: CheersServerRendererProps) => {
  const count = await getCheersCountForSlug(slug);
  return (
    <div className={styles.container}>
      <CheersClientRenderer count={count} slug={slug} location={location} />
    </div>
  );
};
