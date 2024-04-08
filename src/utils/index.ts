import { URL } from "url";
export const test = (url: string) => {
  return new URL(url).pathname;
};

