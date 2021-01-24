const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let dimensions = []; // for setting wall dimensions
let bricks = []; // this is the walls rolls
const askForDimensions = () => {
  // getting dimension grom user
  return new Promise((resolve, reject) => {
    rl.question("Please enter wall dimensions? ", (answer) => {
      dimensions = toArray(answer); //transforming it to array
      resolve();
    });
  });
};

const askForRows = () => {
  //asking for rows
  return new Promise((resolve, reject) => {
    rl.question(`Please enter a row: `, (answer) => {
      bricks = [...bricks, answer]; // adding answers to bricks
      resolve();
    });
  });
};

const toArray = (value) => {
  //transforming to array
  if (typeof value !== "object") {
    return value.split(" ");
  } else {
    value;
  }
};

const validateDimension = (number) => {
  // validate if dimensions are under < 100 and if theu are even
  return number < 100 && number % 2 === 0 ? true : false;
};

const validate = (upper, lower) => {
  //ckecking if layers are valid
  let i = 0;
  let length = upper.length;
  if (lower.length !== upper.length) {
    return false;
  }
  while (i < length) {
    if (i + 1 < length) {
      if (upper[i] == upper[i + 1] && lower[i] == lower[i + 1]) {
        i += 2;
        return true;
      }
      if (upper[i] != upper[i + 1] && upper[i] != lower[i]) {
        return false;
      }
    } else if (upper[i] != lower[i]) {
      return false;
    }
    i++;
  }
};

const drawWall = (upper, lower) => {
  //here we set the new layer and console log it aka Draw it to the console
  //this should switch places of horizontal brick with vertical
  // I wish i had more time to work on this function ....
  let i = 0;
  let length = upper.length;
  let upperOut = [];
  let lowerOut = [];
  while (i < length) {
    if (i + 4 < length) {
      if (upper[i] == upper[i + 1] && upper[i + 2] == upper[i + 3]) {
        upperOut.push(
          "*" + upper[i] + "*",
          "*" + upper[i + 2],
          upper[i + 3] + "*",
          "*" + lower[i + 3] + "*"
        );
        lowerOut.push(
          "*" + upper[i] + "*",
          "*" + lower[i],
          lower[i + 1] + "*",
          "*" + lower[i + 3]
        ) + "*";
        i += 4;
        if (upper[i] == lower[i] && upper[i + 1] == upper[i + 2]) {
          upperOut.push(
            "*" + upper[i],
            upper[i] + "*",
            "*" + upper[i + 2] + "*"
          );
          lowerOut.push(
            "*" + lower[i + 1],
            lower[i + 2] + "*",
            "*" + upper[i + 2] + "*"
          );
          i += 3;
        }
        if (upper[i] == lower[i] && upper[i + 1] == lower[i + 1]) {
          upperOut.push("*" + upper[i], lower[i] + "*");
          lowerOut.push("*" + upper[i + 1], lower[i + 1] + "*");
          i += 2;
        }
        if (upper[i] == upper[i + 1] && upper[i + 2] == lower[i + 2]) {
          upperOut.push(
            "*" + upper[i] + "*",
            "*" + lower[i + 2],
            lower[i + 2] + "*"
          );
          lowerOut.push(
            "*" + upper[i] + "*",
            "*" + lower[i + 1],
            lower[i + 1] + "*"
          );
          i += 3;
        }
      }
    }

    if (upperOut.length > length - 1) {
      upperOut[length - 1] = "*" + lower[length - 1] + "*";
      lowerOut[length - 1] = "*" + upper[length - 1] + "*";
      upperOut.splice(length);
      lowerOut.splice(length);
    }
    if (lowerOut.length > length - 1) {
      upperOut[length - 1] = "*" + lower[length - 1] + "*";
      lowerOut[length - 1] = "*" + upper[length - 1] + "*";
      upperOut.splice(length);
      lowerOut.splice(length);
    }
  }
  let uppertoString = upperOut.toString().replace(/,/g, " ");
  let lowerToString = lowerOut.toString().replace(/,/g, " ");
  console.log(uppertoString);
  console.log(lowerToString);
  console.log("*".repeat(upper.length * 10));
};

const main = async () => {
  //main function combining the rrest
  await askForDimensions(); //waiting for dimension to be added
  if (validateDimension(dimensions[0]) && validateDimension(dimensions[1])) {
    //checking if dimension are valid
    for (i = 1; i <= dimensions[0]; i++) {
      await askForRows(); // asking for rows
    }
    if (validate(toArray(bricks[0]), toArray(bricks[1]))) {
      //validating rows
      for (i = 0; i <= dimensions[0]; i++) {
        drawWall(toArray(bricks[i]), toArray(bricks[i + 1])); //drawing the new wall
      }
      if (i == dimensions[0]) {
        rl.close();
      }
    } else {
      console.log(-1 + " No solution exists"); // console log if input is not valid
      rl.close();
    }
  }
};

main();
