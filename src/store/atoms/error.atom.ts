import { atom } from "recoil";

export const globalErrorState = atom<string | null>({
  key: "globalErrorState",
  default: null,
});
