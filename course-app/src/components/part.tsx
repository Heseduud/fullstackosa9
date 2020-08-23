import React from "react";
import { PartProps } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<PartProps> = ({part}) => {
  switch (part.name) {
    case "Fundamentals":
      return <div>
        <p>Name: {part.name}</p>
        <p>Description: {part.description}</p>
        <p>ExerciseCount: {part.exerciseCount}</p>
      </div>;
    case "Using props to pass data":
      return <div>
        <p>Name: {part.name}</p>
        <p>GroupProjectCount: {part.groupProjectCount}</p>
        <p>ExerciseCount: {part.exerciseCount}</p>
      </div>;
    case "Deeper type usage":
      return <div>
        <p>Name: {part.name}</p>
        <p>Description: {part.description}</p>
        <p>ExerciseSubmissionLink: {part.exerciseSubmissionLink}</p>
        <p>ExerciseCount: {part.exerciseCount}</p>
      </div>;
    case "Typescript fullstack":
      return <div>
        <p>Name: {part.name}</p>
        <p>Description: {part.description}</p>
        <p>HoursUsedForExercises: {part.hoursUsedForExercises}</p>
        <p>ExerciseCount: {part.exerciseCount}</p>
      </div>;
    default:
      return assertNever(part);
  }
};

export default Part;