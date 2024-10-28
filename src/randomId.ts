export const generateRandomId = <T extends ArrayBufferView | null>(
  array: T
) => {
  return crypto.getRandomValues(array);
};
