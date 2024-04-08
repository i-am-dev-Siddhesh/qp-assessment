import { URL } from "url";
 

export const getPath = (url: string) => {
  return new URL(url).pathname;
};

export function getFilenameFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const index = pathname.lastIndexOf("/");
  return pathname.substring(index + 1); // if index === -1 then index+1 will be 0
}
export const generateOTP = () => {
  // Generate a random six-digit number
  const otp = Math.floor(Math.random() * 900000) + 100000;
  return otp;
};
