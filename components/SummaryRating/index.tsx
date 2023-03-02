import { SummaryRatingProps } from "@/interfaces";
import React from "react";
import SummaryActionButton from "./ActionButton";
import SummaryRatingContainer from "./RatingContainer";
import SummaryTitle from "./Title";

const SummaryRating: React.FC<{
  title: string;
  summaryRatings: SummaryRatingProps[];
}> = ({ title, summaryRatings }) => {
  return (
    <>
      <SummaryTitle univTitle={title} />
      <SummaryActionButton pagePath="university" />
      <SummaryRatingContainer summaryRatings={summaryRatings} />
    </>
  );
};

export default SummaryRating;
