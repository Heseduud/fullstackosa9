import React from "react";
import { ContentProps as TotalProps } from "../types";

const Total: React.FC<TotalProps> = (props) => {
  return <p>
    Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>;
};

export default Total;