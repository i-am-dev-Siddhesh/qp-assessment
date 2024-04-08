import jwt from 'jsonwebtoken';
import { refreshTokenExp, tokenExp } from '../constants';

export const  createJWTToken = (
  data: any,
  type: 'user' | 'admin' | undefined | null
) => {
  const token = jwt.sign(
    data,
    type === 'admin'
      ? process.env.JWT_ADMIN_TOKEN_SECRET!
      : process.env.JWT_TOKEN_SECRET!,
    {
      expiresIn: refreshTokenExp,
    }
  );
  return { token, expirationTime: Date.now() + refreshTokenExp };
};

export const decodeJWTToken = (data: any, type: 'user' | 'admin') => {
  const token = jwt.verify(
    data,
    type === 'admin'
      ? process.env.JWT_ADMIN_TOKEN_SECRET!
      : process.env.JWT_TOKEN_SECRET!
  );
  return token;
};

export const createRefreshToken = (data: any) => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET!, {
    expiresIn: refreshTokenExp,
  });
  return token;
};

export const verifyRefreshToken = (token: string) => {
  try {
    const user = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET!);
    return user;
  } catch (err) {
    throw err;
  }
};
