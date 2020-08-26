import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const matchDiagnose = (diagnosisCode: string): string => {
    return diagnoses[diagnosisCode].name;
  };

  return (
    <Segment>
      <h3>{entry.date} <Icon name='hospital' size='big'/></h3>
      <p>{entry.description}</p>
      <p>Discharge: {entry.discharge.date}</p>
      <p>Criteria: {entry.discharge.criteria}</p>
      { entry.diagnosisCodes
        ? <ul>
            {entry.diagnosisCodes.map(dc => 
              <li key={dc}>
                {dc} {matchDiagnose(dc)}
              </li>
              )}
          </ul>
        : <p>No diagnosis codes</p>
      }
    </Segment>
  );
};

export default HospitalEntryComponent;