import next from 'eslint-config-next/core-web-vitals';

const config = [
  ...next,
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'blurhash-generator/**',
      'post-metadata-generator/**',
      'img-serve/**',
      'src/post-metadata.ts',
      'src/posts/components.ts',
      'src/post-slugs.ts',
      'src/post-count.ts',
      'src/book-slugs.ts',
      'src/book-count.ts',
    ],
  },
];

export default config;
