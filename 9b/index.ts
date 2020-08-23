import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi?', (req, res) => {
  const h = Number(req.query.height);
  const w = Number(req.query.weight);

  if (!h || !w || isNaN(h) || isNaN(w)) {
    return res.status(400).json({ error: 'Malformatted parameters' });
  }

  return res.send({
    weight: w,
    height: h,
    bmi: calculateBmi(h, w)
  });
});

type reqBod = {
  daily_exercises: number[],
  target: number
};

app.post('/exercises', (req, res) => {
  const body : reqBod = req.body as reqBod;
  console.log('body: ', body);
  const dailyExercises: number[] = body.daily_exercises;
  console.log(dailyExercises);
  const target: number = body.target;
  console.log(target);

  if (!target || !dailyExercises || dailyExercises.length < 1) {
    return res.status(400).json({ error: 'Parameters missing!'});
  }

  if (isNaN(target) || dailyExercises.some(isNaN)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const response = calculateExercises(dailyExercises, target);
  return res.json(response);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Express server running at port: ${PORT}`);
});