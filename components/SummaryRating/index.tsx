import { SummaryRatingProps } from "@/interfaces";
import { useRouter } from "next/router";
import React from "react";
import SummaryActionButton from "./ActionButton";
import SummaryRatingContainer from "./RatingContainer";
import SummaryTitle from "./Title";



const SummaryRating: React.FC<{
  title: string;
  pagePath: string;
  overallRating: number,
  summaryRatings: SummaryRatingProps[];
}> = ({ title, pagePath, overallRating, summaryRatings }) => {
  return (
    <>
      <SummaryTitle title={title} />
      <SummaryActionButton pagePath={pagePath} />
      <SummaryRatingContainer overallRating={overallRating} summaryRatings={summaryRatings} />
    </>
  );
};

export default SummaryRating;
