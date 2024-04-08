export const __prod__ = process.env.SERVER_ENV === 'production';

export const ACCESS_DENIED_MESSAGE = 'Access to the resource is denied',
  NOT_AUTHENTICATED_MESSAGE =
    'You are not authenticated to perform this action',
  GENERAL_ERROR_MESSAGE = 'Something went wrong',
  SERVER_RUNNING_MESSAGE = 'Server is in running state';

export const tokenKey = 'qid',
  tokenExp = 1000 * 60 * 60 * 24, // 24 hours
  refreshTokenExp = 1000 * 60 * 60 * 24 * 60; // 30 days

export const signedUrlExp = 600; // seconds

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const subscriptionValidTime = 7 * 24 * 60 * 60 * 1000,
  subscriptionEndDate = new Date(
    Date.now() + subscriptionValidTime
  ).toUTCString();

export const otpExpireSeconds = 300; // 5mins

export const MTALKZ_API_KEY = '',
  MTALKZ_SENDER_ID = '';
