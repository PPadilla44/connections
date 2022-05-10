import React from "react";
import { UseFormRegister, ValidationRule } from "react-hook-form";

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

const Input = ({ name, label, register, rules, errorMessage, type }: InputProps) => (
  
  <>
    <input
      {...register(name, {
        minLength: rules.minLength,
        pattern: rules.pattern,
        required: rules.required,
      })}
      placeholder={label}
      className="w-full py-4 border-2 border-black px-3"
      type={type ? type : "text"}
      
    />
    { errorMessage && <span className="text-red-600">{errorMessage}</span>}

  </>
);

export default Input;
