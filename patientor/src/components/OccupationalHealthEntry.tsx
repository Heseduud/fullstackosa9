import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry as OHE } from "../types";
import { useStateValue } from "../state";

const OccupationalHealthComponent: React.FC<{ entry: OHE }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const matchDiagnose = (diagnosisCode: string): string => {
    return diagnoses[diagnosisCode].name;
  };

  return (
    <Segment>
      <h3>{entry.date} <Icon name='stethoscope' size='big'/></h3>
      <p>{entry.description}</p>
      { entry.sickLeave ? <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p> : null}
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

export default OccupationalHealthComponent;