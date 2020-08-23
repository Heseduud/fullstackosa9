import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";

const SinglePatientPage: React.FC = () => {
  const { id: idOfPatient } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const singlePatient = patients[idOfPatient];

  React.useEffect(() => {
    if (singlePatient.ssn && singlePatient.entries) {
      return;
    }

    const fetchSinglePatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${idOfPatient}`
        );
        dispatch(updatePatient(patient));
      } catch (e) {
        console.error(e);
      }
    };

    fetchSinglePatient();
  }, [dispatch, idOfPatient, singlePatient.entries, singlePatient.ssn]);

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>{singlePatient.name}
          {
            singlePatient.gender === "male" ? <Icon className="mars icon"/> : <Icon className="venus icon"/>
          }
        </h3>
        <p>ssn: {singlePatient.ssn}</p>
        <p>occupation: {singlePatient.occupation}</p>
      </Container>
    </div>
  );
};

export default SinglePatientPage;