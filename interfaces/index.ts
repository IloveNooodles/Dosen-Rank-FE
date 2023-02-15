import { OptionBase } from "chakra-react-select";
import { Props as ReactSelectProps } from "chakra-react-select";
import { InputProps as ChakraInputProps } from "@chakra-ui/react";

/*
 * Object Interfaces
 */
export interface Account {
  nama: string;
  email: string;
  password: string;
  university: string;
}

export interface University {
  id: number;
  name: string;
}

/*
 * Page Interfaces
 */
export interface RegisterProps {
  universities: Array<University>;
}

export interface RegisterFormProps {
  universities: Array<University>;
}

/*
 * Component Interfaces
 */
export interface TextFieldProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export interface SelectOption extends OptionBase {
  label: string;
  value: string;
}

export interface SelectFieldProps extends ReactSelectProps<SelectOption> {
  name: string;
  label?: string;
  options: Array<SelectOption>;
}
