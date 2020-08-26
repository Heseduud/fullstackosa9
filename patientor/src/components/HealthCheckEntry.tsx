import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";

const HealthCheckComponent: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const matchDiagnose = (diagnosisCode: string): string => {
    return diagnoses[diagnosisCode].name;
  };

  enum HealthColors {
    Green = "green",
    Yellow = "yellow",
    Red = "red",
    Black = "black",
    Grey = "grey"
  }

  const getHealthColor = (rating: number): HealthColors => {
    switch (rating) {
      case 0:
        return HealthColors.Green;
      case 1:
        return HealthColors.Yellow;
      case 2:
        return HealthColors.Red;
      case 3:
        return HealthColors.Black;
      default:
        return HealthColors.Grey;
    }
  };

  return (
    <Segment>
      <h3>{entry.date} <Icon name='user md' size='big'/></h3>
      <p>{entry.description}</p>
      <Icon name='heart' size='big' color={getHealthColor(entry.healthCheckRating)}/>
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

export default HealthCheckComponent;