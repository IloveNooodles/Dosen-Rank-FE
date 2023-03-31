import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { OptionBase, Props as ReactSelectProps } from "chakra-react-select";

/*
 * Object Interfaces
 */
export interface Account {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  university?: string;
  isAdmin?: boolean;
  univId?: number;
}

export interface University {
  id: number;
  name: string;
  slug: string;
}

export interface Course {
  id: number;
  name: string;
}

export interface Professor {
  id: number;
  name: string;
}

export interface Creator {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

/**
 * Response Interfaces
 */
export interface Response<T> {
  data: T;
}

export interface ProfessorResponse {
  id: number;
  name: string;
  institutionId: number;
  institutionName: string;
  slug: string;
}

export interface CourseResponse {
  id: number;
  course_id: number;
  name: string;
  institute_id: number;
  institution_name: string;
  slug: string;
}

export interface Review {
  tag: string;
  firstFieldRating: number;
  secondFieldRating: number;
  thirdFieldRating: number;
  fourthFieldRating: number;
  details: string;
}

export interface Report {
  reportType: string;
  reportedId: number;
  content?: string;
  tags: number;
}

/*
 * Page Interfaces
 */
export interface RegisterProps {
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

export interface SummaryRatingProps {
  name: string;
  value: number;
}

export interface SummaryRatingContainerProps {
  overallRating: number;
  summaryRatings: SummaryRatingProps[];
}
