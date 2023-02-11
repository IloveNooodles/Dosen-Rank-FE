import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField, FieldHookConfig } from 'formik';
import * as Yup from 'yup';
import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps } from '@chakra-ui/react';

export interface TextFieldProps extends InputProps {
  name: string;
  label?: string;
}

const MyTextInput = ({ label, name, ...props }: TextFieldProps) => {
  const [field, meta] = useField(name);
  
  return (
    <FormControl isInvalid={!!(meta.touched && meta.error)}>
      {label ? <FormLabel htmlFor={props.id}>
        {label}
      </FormLabel> : null}
      <ChakraInput {...field} {...props} />
      {meta.touched && meta.error ? (
         <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default MyTextInput