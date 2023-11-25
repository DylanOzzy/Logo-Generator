const inquirer = require("inquirer");
const fs = require("fs").promises;
const path = require("path");
const userData = {};

const promptUser = async () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "logoText",
        message:
          "What text would you like to include in your logo? (enter up to three characters)",
        validate: function (input) {
          return input.length === 3
            ? true
            : "Please enter exactly 3 characters.";
        },
      },
      {
        type: "input",
        name: "textColor",
        message:
          "What color would you like the logo text to be? (enter color keyword OR a hexadecimal number)",
      },
      {
        type: "list",
        name: "shape",
        message: "What shape would you like to use?",
        choices: ["Circle", "Triangle", "Square"],
      },
      {
        type: "input",
        name: "shapeColor",
        message:
          "What color would you like the logo shape to be? (enter color keyword OR a hexadecimal number)",
      },
    ])
    .then((data) => {
      Object.assign(userData, data);
      console.log(userData);
      return userData;
    });
};

const generateLogo = (userData) => {
  switch (userData.shape) {
    case "Circle":
      const circleSVG = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="100" r="80" fill="${userData.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${userData.textColor}">${userData.logoText}</text>
      </svg>`;
      return circleSVG;
      break;

    case "Square":
      const squareSVG = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="${userData.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${userData.textColor}">${userData.logoText}</text>
      </svg>`;
      return squareSVG;
      break;

    case "Triangle":
      const triangleSVG = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="150,20 280,180 20,180" fill="${userData.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${userData.textColor}">${userData.logoText}</text>
      </svg>`;
      return triangleSVG;
      break;

    default:
      return '';
  }
};

const handleSaveSVG = async () => {
  const userData = await promptUser();
  const logoSVG = generateLogo(userData);
  const saveSVG = './output/';
  const fileName = `${userData.logoText}.svg`;
  const saveSVGPath = path.join(__dirname, saveSVG, `${fileName}`);
  fs.writeFile(saveSVGPath, logoSVG);
};

handleSaveSVG();