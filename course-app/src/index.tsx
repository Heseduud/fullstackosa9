import React from "react";
import ReactDOM from "react-dom";
import { CoursePart } from "./types"
import Header from "./components/header"
import Content from "./components/content";
import Total from "./components/total";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Typescript fullstack",
      exerciseCount: 27,
      description: "Something",
      hoursUsedForExercises: 20
    }
  ];

  return (
    <div>
      <Header header={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));