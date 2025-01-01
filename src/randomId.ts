export const randomId = <T extends ArrayBufferView | null>(array: T) => {
  return crypto.getRandomValues(array);
};
