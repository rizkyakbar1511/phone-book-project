export const setArrayToLocalStorage = (key: string, array: unknown) => {
  const serializedArray = JSON.stringify(array);
  localStorage.setItem(key, serializedArray);
};

export const removeArrayFromLocalStorage = (key: string, contactId: number) => {
  const serializedArray = localStorage.getItem(key);
  if (serializedArray) {
    const filteredArray = JSON.stringify(JSON.parse(serializedArray).filter((id: number) => id !== contactId));
    localStorage.setItem(key, filteredArray);
    return JSON.parse(serializedArray);
  }
  return [];
};

export const getArrayFromLocalStorage = (key: string): number[] => {
  const serializedArray = localStorage.getItem(key);
  if (serializedArray) {
    return JSON.parse(serializedArray);
  }
  return [];
};
