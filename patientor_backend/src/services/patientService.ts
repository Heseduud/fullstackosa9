import { Patient, NewPatientEntry, Entry, NewEntry } from '../types';
import patients from '../../data/patients';
import { v4 } from 'uuid';
import { PublicPatient } from '../types';

const getFilteredPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newId: string = v4();

  const newPatient = {
    id: newId,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const getSinglePatient = (id: string): Patient => {
  const toFind = patients.find(p => p.id === id);
  if (toFind === undefined) {
    throw new Error('Patient doesnt exist');
  }

  return toFind;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newId: string = v4();
  const patient = getSinglePatient(id);

  const newEntry = {
    id: newId,
    ...entry
  } as Entry;

  patient.entries.push(newEntry);
  return newEntry;
};

export default { getFilteredPatients, addPatient, getSinglePatient, addEntry };