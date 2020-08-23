import express from 'express';
import patientService from '../services/patientService';
import patientValidator from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getFilteredEntries());
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getSinglePatient(req.params.id);
    res.json(patient);
  } catch (e) {
    res.status(400).send('Patient not found');
  }
});

router.post('/', (req, res) => {
  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  // const newPatientEntry = patientService.addEntry(
  //   {
  //     name,
  //     dateOfBirth,
  //     ssn,
  //     gender,
  //     occupation
  //   }
  // );

  // res.json(newPatientEntry);
  try {
    const newPatientEntry = patientValidator(req.body);
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;