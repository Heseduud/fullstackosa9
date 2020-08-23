export const calculateBmi = (h: number, w: number): string => {
  const bmi = w / Math.pow(h/100, 2);
  if (bmi < 15) {
    return ('Very severely underweight');
  } else if (bmi <= 16) {
    return ('Severely underweight');
  } else if (bmi <= 18.5) {
    return ('Underweight');
  } else if (bmi <= 25) {
    return ('Normal (healthy weight)');
  } else if (bmi <= 30) {
    return ('Overweight');
  } else if (bmi <= 35) {
    return ('Obese class I (Moderately obese)');
  } else if (bmi <= 40) {
    return ('Obese class II (Severely obese)');
  } else {
    return ('Obese class III (Very severely obese)');
  }
};

// const a: number = Number(process.argv[2]);
// const b: number = Number(process.argv[3]);

// if (isNaN(a) || isNaN(b)) {
//   console.log('Both arguments have to be numbers');
//   process.exit();
// }

// console.log(calculateBmi(a, b));