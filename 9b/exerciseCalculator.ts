interface resultObj {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (trainingHours: Array<number>, goalAvg: number): resultObj => {
  const pl = trainingHours.length;
  const td = trainingHours.filter(day => day > 0).length;
  const avg = trainingHours.reduce((a, b) => a + b, 0) / pl;
  const s = avg >= goalAvg;

  const rating = rateAvgs(avg, goalAvg);
  const r = rating[0];
  const rd = rating[1];

  return {
    periodLength: pl,
    trainingDays: td,
    success: s,
    rating: r,
    ratingDescription: rd,
    target: goalAvg,
    average: avg
  };
};

const rateAvgs = (avg: number, goalAvg: number): [number, string] => {
  if (avg >= goalAvg) return [3, 'Great job!'];
  else if (avg + 0.5 >= goalAvg) return [2, 'Not bad, but could be better'];
  else return [1, 'Didnt reach goal, try better next time!'];
};

// const inputAvg = Number(process.argv[2]);
// const inputArgs = process.argv.slice(3);
// const inputHours: Array<number> = [];
// inputArgs.forEach(a => inputHours.push(Number(a)));

// if (isNaN(inputAvg) || inputHours.includes(NaN)) {
//   console.log('All input arguments have to be numbers');
//   process.exit();
// }

// console.log(calculateExercises(inputHours, inputAvg));