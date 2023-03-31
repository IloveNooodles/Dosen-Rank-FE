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
  reportFor: string;
  reportedId: number;
}> = ({ title, pagePath, overallRating, summaryRatings, reportFor, reportedId }) => {
  return (
    <>
      <SummaryTitle title={title} reportFor={reportFor} reportedId={reportedId} />
      <SummaryActionButton pagePath={pagePath} />
      <SummaryRatingContainer overallRating={overallRating} summaryRatings={summaryRatings} />
    </>
  );
};

export default SummaryRating;
