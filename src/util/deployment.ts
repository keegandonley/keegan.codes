import {
  getFullyQualifiedDeploymentUrl as __getFullyQualifiedDeploymentUrl,
  getUrlFromHost as __getUrlFromHost,
  getCookieDomain as __getCookieDomain,
} from '@keegancodes/foundations';

export const getFullyQualifiedDeploymentUrl = async (path: `/${string}`) => {
  return __getFullyQualifiedDeploymentUrl(
    path,
    async () => {
      const headers = (await import('next/headers')).headers;

      return headers;
    },
    '3561',
  );
};

export const getUrlFromHost = __getUrlFromHost;

export const getCookieDomain = () => __getCookieDomain('keegan.codes');
