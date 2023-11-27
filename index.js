const inquirer = require("inquirer");
const fs = require("fs").promises;
const path = require("path");

class Shape {
  constructor(userData) {
    this.userData = userData;
  }

  render() {
    throw new Error("render method must be implemented by child classes");
  }
}

class Circle extends Shape {
  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="100" r="80" fill="${this.userData.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.userData.textColor}">${this.userData.logoText}</text>
      </svg>`;
  }
}

class Square extends Shape {
  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="${this.userData.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.userData.textColor}">${this.userData.logoText}</text>
      </svg>`;
  }
}

class Triangle extends Shape {
  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="150,20 280,180 20,180" fill="${this.userData.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.userData.textColor}">${this.userData.logoText}</text>
      </svg>`;
  }
}

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
      return data;
    });
};

const handleSaveSVG = async () => {
  try {
    const userData = await promptUser();

    let shape;
    switch (userData.shape) {
      case "Circle":
        shape = new Circle(userData);
        break;
      case "Square":
        shape = new Square(userData);
        break;
      case "Triangle":
        shape = new Triangle(userData);
        break;
    }

    const logoSVG = shape.render();
    const saveSVG = './output/';
    const fileName = `logo.svg`;
    const saveSVGPath = path.join(__dirname, saveSVG, `${fileName}`);
    await fs.writeFile(saveSVGPath, logoSVG);
    console.log("Generated logo.svg");
  } catch (error) {
    console.error("Error handling SVG:", error);
  }
};

handleSaveSVG();


module.exports = { Shape, Circle, Square, Triangle };