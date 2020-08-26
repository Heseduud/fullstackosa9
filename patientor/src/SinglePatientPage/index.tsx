import React from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Entry } from "../types";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import EntryComponent from "../components/EntryComponent";
import AddEntryModal from "../AddEntryModal";

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

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => { setModalOpen(false); };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${idOfPatient}/entries`, values
      );
      if (singlePatient.entries) {
        singlePatient.entries.push(newEntry);
      } else {
        singlePatient.entries = [newEntry];
      }
      dispatch(updatePatient(singlePatient));
      closeModal();
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className="App">
      <Container textAlign="left">
        <h3>{singlePatient.name}
          {
            singlePatient.gender === "male" ? <Icon className="mars icon"/> : <Icon className="venus icon"/>
          }
        </h3>
        <p>ssn: {singlePatient.ssn}</p>
        <p>occupation: {singlePatient.occupation}</p>
        <h3>Entries</h3>
        {
          singlePatient.entries === undefined || !singlePatient.entries || singlePatient.entries.length === 0
          ? <p>No entries for patient</p>
          : singlePatient.entries.map(entry => <EntryComponent key={entry.id} entry={entry}/>)
        }
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add new entry</Button>
    </div>
  );
};

export default SinglePatientPage;