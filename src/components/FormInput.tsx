import { useState, KeyboardEventHandler, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { PRIMARY_COLOR } from "@/constants/color";
import { css } from "@emotion/react";
import useInput from "@/hooks/useInput";

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

const styles = {
  self: css`
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  `,
  label: css`
    display: block;
    color: ${PRIMARY_COLOR};
    font-size: 0.75rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
  `,
  input: css`
    width: 100%;
    background: #fff;
    display: block;
    border: 1px solid #e6e6e6;
    padding: 0.375rem 0.625rem;
    border-radius: 0.25rem;
    &:focus-visible {
      outline: 1px solid ${PRIMARY_COLOR};
    }
  `,
};

const FormInput: React.FC = () => {
  const { inputValues, setInputValue } = useInput();
  const [inputValue, setCreateInputValue] = useState("");
  const [value, setValue] = useState<readonly Option[]>([]);

  useEffect(() => {
    if (inputValues["phones"].length > 0) {
      setValue(inputValues["phones"].map(({ number }) => ({ label: number, value: number })));
    }
  }, [inputValues]);

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("phones", [...inputValues["phones"], { number: inputValue }]);
        setCreateInputValue("");
        event.preventDefault();
    }
  };

  return (
    <div css={styles.self}>
      <label css={styles.label}>First Name</label>
      <input
        name="first_name"
        value={inputValues["first_name"]}
        onChange={(e) => setInputValue("first_name", e.target.value)}
        css={styles.input}
      />
      <label css={styles.label}>Last Name</label>
      <input
        name="last_name"
        value={inputValues["last_name"]}
        onChange={(e) => setInputValue("last_name", e.target.value)}
        css={styles.input}
      />
      <label css={styles.label}>Phones</label>
      <CreatableSelect
        name="Phones"
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setCreateInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder=""
        value={value}
      />
    </div>
  );
};

export default FormInput;
