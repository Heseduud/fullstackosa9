import express from 'express';
import patientService from '../services/patientService';
import { validateEntry, validatePatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getFilteredPatients());
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
  try {
    const newPatient = validatePatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = validateEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

export default router;