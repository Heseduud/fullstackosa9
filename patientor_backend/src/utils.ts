/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, Entry, NewEntry, Discharge, Diagnose, HealthCheckRating, SickLeave } from './types';

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

/*
  Probably should delete this and refactor to use entry validators from below
  Still works this way and we could assume that entries already in the database
  (patients.ts file in this case) are valid anyways
*/
const isValidEntry = (entry : any): entry is Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const objectValues = Object.values(entry) as string[];
  const validTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  return (objectValues.some(e => validTypes[0].indexOf(e) !== -1));
};

const isEntryList = (entries : Array<any>): entries is Entry[] => {
  return entries.some(e => !isValidEntry(e));
};

const parseEntries = (entries : any): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error(`Incorrect or missing Entry array: ${entries}`);
  }

  if (!isEntryList(entries)) {
    return [];
  }

  return entries;
};

export const validatePatient = (object : any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender), 
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
};

const isValidType = (type : string): boolean => {
  const validTypes: string[] = ["Hospital", "HealthCheck", "OccupationalHealthcare"];
  if (validTypes.includes(type)) {
    return true;
  }
  return false;
};

const parseType = (type : any): string => {
  if (!type || !isString(type) || !isValidType(type)) {
    throw new Error(`Incorrect or missing Type: ${type}`);
  }
  return type;
};

const parseDescription = (desc : any): string => {
  if (!desc || !isString(desc)) {
    throw new Error(`Incorrect or missing Description: ${desc}`);
  }
  return desc;
};

const parseDate = (date : any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing Date: ${date}`);
  }
  return date;
};

const parseSpecialist = (spec : any): string => {
  if (!spec || !isString(spec)) {
    throw new Error(`Incorrect or missing Specialist: ${spec}`);
  }
  return spec;
};

const isDischarge = (disc : any): disc is Discharge => {
  return ("date" in disc && "criteria" in disc);
};

const parseDischarge = (disc : any): Discharge => {
  if (!disc || !isDischarge(disc)) {
    throw new Error(`Incorrect or missing Discharge: ${disc}`);
  }
  return disc;
};

const isCode = (code : any): code is Diagnose['code'] => {
  return (isString(code) && Boolean(code.match(/(\w{1}\d{2}\.\d{1,2})|(\w{1}\d{2})/g)));
};

const parseCodes = (codes : any): Array<Diagnose['code']> => {
  if (!codes || !Array.isArray(codes)) {
    return [];
  }

  if (codes.some(c => !isCode(c))) {
    throw new Error(`Incorrect diagnosis codes: ${codes}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};

const isRating = (rating : number): rating is HealthCheckRating => {
  if (rating > 3 || rating < 0) return false;
  return true;
};

const parseRating = (rating : any): HealthCheckRating => {
  if (isNaN(rating) || !isRating(rating)) {
    throw new Error(`Incorrect or missing HealthCheck rating: ${rating}`);
  }
  return rating;
};

const isLeave = (leave : any): leave is SickLeave => {
  return ("startDate" in leave && "endDate" in leave);
};

const parseLeave = (leave : any): SickLeave | undefined => {
  if (!leave || !isLeave(leave)) {
    return undefined;
  }
  return leave;
};

export const validateEntry = (object: any): NewEntry => {
  const baseObject = {
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseCodes(object.diagnosisCodes)
  };

  switch (baseObject.type) {
    case "Hospital":
      return {
        ...baseObject,
        type: "Hospital",
        discharge: parseDischarge(object.discharge)
      };
    case "HealthCheck":
      return {
        ...baseObject,
        type: "HealthCheck",
        healthCheckRating: parseRating(object.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        ...baseObject,
        type: "OccupationalHealthcare",
        employerName: parseName(object.employerName),
        sickLeave: parseLeave(object.sickLeave)
      };
    default: 
      throw new Error(`Incorrect or missing Type of entry: ${baseObject.type}`);
  }
};