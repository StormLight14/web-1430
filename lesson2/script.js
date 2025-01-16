let firstName = prompt("What's your first name?");
let lastName = prompt("What's your second name?");
let nickName = prompt("What's your nickname?");

console.log(`Hello! My name is ${firstName} ${lastName}, but you can call me ${nickName}.`);
console.log(`Your full name has ${(firstName.length + lastName.length)} characters.`);

let heightInCm = prompt("What is your height in cm?", 0);
let weightInKg = prompt("What is your weight in kg?", 0);
console.log(`Your height in inches is ${heightInCm / 2.54}.`);
console.log(`Your weight in pounds is ${weightInKg * 2.20462}.`);

console.log(`Fun Fact: Did you know ${Math.floor(Math.random() * (3 - 1)) + 1} is a cool number about me?`);

let careerGoal = prompt("What is a career goal you have?");
console.log(`One of my goals is ${careerGoal}`);
console.log(`This goal has ${careerGoal.length} characters.`);

let date = new Date();

let birthYear = prompt("What year were you born?", 2000);
let currentAge = date.getFullYear() - birthYear;

console.log(`I am ${currentAge} years old, and I've lived approximately ${currentAge * 365} days so far.`);

const lastDayOfYear = new Date(date.getFullYear(), 11, 31) // i hate that 12 isnt december

console.log(`Today's date is ${date.toLocaleDateString()}, and there are ${365 - new Date(lastDayOfYear - date).getDate()} days remaining in the year.`);