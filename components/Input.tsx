import React, { useState } from "react";
import { UseFormRegister, ValidationRule } from "react-hook-form";
import { Icon } from "@iconify/react";

interface InputProps {
  name: string;
  label: string;
  errorMessage: string;
  type?: React.HTMLInputTypeAttribute;
  register: UseFormRegister<any>;
  rules: {
    required?: string | ValidationRule<boolean>;
    minLength?: ValidationRule<number>;
    pattern?: ValidationRule<RegExp>;
  };
}

const Input = ({
  name,
  label,
  register,
  rules,
  errorMessage,
  type,
}: InputProps) => {
  const [newType, setNewType] = useState(type);

  const handleTypeSwitch = () => {
    if (newType === "password") {
      setNewType("text");
    } else {
      setNewType("password");
    }
  };

  return (
    <>
      <div
        className={`w-full border ${
          errorMessage && "border-danger border-2"
        } border-gray outline-none focus-within:border-dom focus-within:border-2 
      placeholder-gray font-light  rounded-md flex items-center relative`}
      >
        <input
          autoComplete="on"
          {...register(name, {
            minLength: rules.minLength,
            pattern: rules.pattern,
            required: rules.required,
          })}
          placeholder={label}
          className={`bg-transparent autofill:rounded w-full outline-none h-full px-3 py-4 `}
          type={newType ? newType : "text"}
        />
        {type === "password" && (
          <div
            onClick={handleTypeSwitch}
            className="absolute right-11 cursor-pointer"
          >
            {newType === "password" ? (
              <Icon className="text-gray" icon={`fa-regular:eye-slash`} />
              ) : (
              <Icon icon={`fa-regular:eye`} />
            )}
          </div>
        )}
      </div>
      {errorMessage && <span className="text-danger">{errorMessage}</span>}
    </>
  );
};

export default Input;
