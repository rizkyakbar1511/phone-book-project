import { createContext, useState } from "react";

type Input = {
  id?: number;
  first_name: string;
  last_name: string;
  phones: { number: string }[];
};

interface InputContextType {
  inputValues: Input; // or use a more specific type
  setInputValue: (name: string, value: { number: string }[] | string | number) => void;
}

export const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inputValues, setInputValues] = useState<Input>({
    first_name: "",
    last_name: "",
    phones: [],
  });

  const setInputValue = (name: string, value: { number: string }[] | string | number) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  return <InputContext.Provider value={{ inputValues, setInputValue }}>{children}</InputContext.Provider>;
};
