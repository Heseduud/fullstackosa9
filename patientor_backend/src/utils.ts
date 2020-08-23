/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, Entry } from './types';

const isString = (text : any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name : any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const isDate = (date : string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date : any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const isSSN = (SSN : string): boolean => {
  return Boolean(SSN.match(/^\d{6}-.{3,4}/g));
};

const parseSSN = (SSN : any): string => {
  if (!SSN || !isString(SSN) || !isSSN(SSN)) {
    throw new Error(`Incorrect or missing SSN: ${SSN}`);
  }

  return SSN;
};

const isGender = (gender : any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender : any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing Gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occ : any): string => {
  if (!occ || !isString(occ)) {
    throw new Error(`Incorrect or missing Occupation: ${occ}`);
  }

  return occ;
};

const isValidEntry = (entry : any): entry is Entry => {
  console.log(Object.values(entry));
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const objectValues = Object.values(entry) as string[];
  const validTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  return objectValues.some(e => validTypes.indexOf(e) !== -1);
};

const isEntryList = (entries : Array<any>): entries is Entry[] => {
  console.log(entries.some(e => isValidEntry(e)));
  return entries.some(e => isValidEntry(e));
};

const parseEntries = (entries : any): Entry[] | [] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error(`Incorrect or missing Entry array: ${entries}`);
  }

  if (!isEntryList(entries)) {
    return [];
  }

  return entries;
};

const validatePatient = (object : any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
};

export default validatePatient;