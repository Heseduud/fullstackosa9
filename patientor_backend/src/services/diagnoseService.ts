import { Diagnose } from '../types';
import diagnoses from '../../data/diagnoses';

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default { getEntries };