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
          message: "What text would you like to include in your logo? (enter up to three characters)",
          validate: function (input) {
            return input.length === 3 ? true : 'Please enter exactly 3 characters.';
          }
        },
        {
          type: "input",
          name: "textColor",
          message:
            "What color would you like the logo text to be? (enter color keyword OR a hexadecimal number)"
        },
        {
          type: "list",
          name: "shape",
          message: "What shape would you like to use?",
          choices: [
            'Circle',
            'Triangle',
            'Square',
          ],
        },
      ])
      .then((data) => {
        Object.assign(userData, data);
        console.log(userData);
        return userData;
      });
};

promptUser();