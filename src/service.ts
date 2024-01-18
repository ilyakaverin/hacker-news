import { IComment } from "./components/Comments/Comments";

export const sliceIntoChunks = (array: number[], chunkSize: number) => {
  const res = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};
export const processDeletedComments = (object: IComment) => {
  if (object.deleted) {
    object.text = "I deleted my comment";
  }
  return object;
};

