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

export interface Tag {
  id: number;
  name: string;
}

export interface UniversityRating {
  reputasi_akademik: number;
  lingkungan: number;
  kemahasiswaan: number;
  fasilitas: number;
}

export interface ProfessorRating {
  konten: number,
  komunikasi: number,
  transparansi: number,
  gaya_mengajar: number,  
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

export interface NewReview {
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
  tag: number;
}

export interface Review {
  id: number;
  creator: {
    id: number;
    name: string;
  };
  institution: {
    id: number;
    name: string;
  };
  upvote: number;
  downvote: number;
  tags: [];
  content: string;
  created_at: string;
  updated_at: string;
  average_rating: number;
}

export interface UnivReview extends Review {
  rating: UniversityRating;
}

export interface ProfessorReview extends Review {
  rating: ProfessorRating;
  professor: Professor;
  course: Course;
}

export interface OverallUnivRating {
  review_count: number;
  overall_rating: number;
  overall_fasilitas: number;
  overall_lingkungan: number;
  overall_kemahasiswaan: number;
  overall_reputasi_akademik: number;
}

export interface OverallProfessorRating {
  review_count: number,
  overall_rating: number,
  overall_konten: number,
  overall_komunikasi: number,
  overall_transparansi: number,
  overall_gaya_mengajar: number,
}

/*
 * Page Interfaces
 */
export interface RegisterProps {
  universities: Array<University>;
  setSuccess: (value: boolean) => void;
  onClick: () => void;
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
