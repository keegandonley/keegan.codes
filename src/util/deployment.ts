import {
  getFullyQualifiedDeploymentUrl as __getFullyQualifiedDeploymentUrl,
  getUrlFromHost as __getUrlFromHost,
  getCookieDomain as __getCookieDomain,
} from '@keegancodes/foundations';
import { getFullyQualifiedDeploymentUrl as __int } from '@keegancodes/foundations-next';

export const getFullyQualifiedDeploymentUrl = async (path: `/${string}`) => {
  return __int(path);
};

export const getUrlFromHost = __getUrlFromHost;

export const getCookieDomain = () => __getCookieDomain('keegan.codes');
