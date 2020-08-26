import React from "react";
import { Entry } from "../types";
import HospitalEntry from "./HospitalEntry";
import HealthEntry from "./HealthCheckEntry";
import OccupationalEntry from "./OccupationalHealthEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry}/>;
    case "HealthCheck":
      return <HealthEntry entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalEntry entry={entry}/>;
    default:
      return assertNever(entry); 
  }
};

export default EntryComponent;
