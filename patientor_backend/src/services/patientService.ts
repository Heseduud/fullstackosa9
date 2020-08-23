import { Patient, NewPatientEntry } from '../types';
import patients from '../../data/patients';
import { v4 } from 'uuid';
import { PublicPatient } from '../types';

const getFilteredEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addEntry = (entry: NewPatientEntry): Patient => {
  const newId: string = v4();

  const newEntry = {
    id: newId,
    ...entry
  };

  patients.push(newEntry);
  return newEntry;
};

const getSinglePatient = (id: string): Patient => {
  const toFind = patients.find(p => p.id === id);
  if (toFind === undefined) {
    throw new Error('Patient doesnt exist');
  }

  return toFind;
};

export default { getFilteredEntries, addEntry, getSinglePatient };