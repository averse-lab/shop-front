import { Filter } from "./components/FilterSelector/_internal/types";
import { CATEGORIES } from "../../_internal/constants";

export const FILTERS: Filter[] = Array.from(CATEGORIES, ([_, value]) => ({
  display: value.display,
  url: value.url,
}));

export const ANIMATIONS = [
  {
    name: "Bounce",
    url: "",
    playbackId: "Su26DLxRkc1MJJ5D1wBtqtcImwsXcaCw9855EGlu3k4",
    index: 1,
  },
  {
    name: "Bounce",
    url: "",
    playbackId: "Su26DLxRkc1MJJ5D1wBtqtcImwsXcaCw9855EGlu3k4",
    index: 8,
  },
  {
    name: "Bounce",
    url: "",
    playbackId: "Su26DLxRkc1MJJ5D1wBtqtcImwsXcaCw9855EGlu3k4",
    index: 9,
  },
  {
    name: "Bounce",
    url: "",
    playbackId: "Su26DLxRkc1MJJ5D1wBtqtcImwsXcaCw9855EGlu3k4",
    index: 10,
  },
];
