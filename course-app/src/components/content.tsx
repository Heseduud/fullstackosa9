import React from "react";
import Part from "./part"
import { ContentProps } from '../types'

const Content: React.FC<ContentProps> = (props) => {
  return <div>
    {props.courseParts.map(coursePart => <Part key={coursePart.name} part={coursePart} />)}
  </div>
};

export default Content;