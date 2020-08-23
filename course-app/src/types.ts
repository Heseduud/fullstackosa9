export interface ContentProps {
  courseParts: Array<CoursePart>;
}

export interface HeaderProps {
  header: string;
}

export interface PartProps {
  part: CoursePart;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartDescriptionBase {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartDescriptionBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartDescriptionBase {
  name: "Typescript fullstack";
  hoursUsedForExercises: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;