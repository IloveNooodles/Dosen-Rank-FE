import { SummaryRatingProps } from "@/interfaces";
import React from "react";
import SummaryActionButton from "./ActionButton";
import SummaryRatingContainer from "./RatingContainer";
import SummaryTitle from "./Title";

const SummaryRating: React.FC<{
  title: string;
  overallRating: number,
  summaryRatings: SummaryRatingProps[];
}> = ({ title, overallRating, summaryRatings }) => {
  return (
    <>
      <SummaryTitle univTitle={title} />
      <SummaryActionButton pagePath="university" />
      <SummaryRatingContainer overallRating={overallRating} summaryRatings={summaryRatings} />
    </>
  );
};

export default SummaryRating;
