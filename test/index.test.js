const { Shape, Circle, Square, Triangle } = require("../index.js");

describe("Shape", () => {
  describe("Circle", () => {
    it("should return an SVG string that has a logo text of 'ABC' that has a color of 'black' and a 'circle' background that is 'red'.", () => {
      const userData = {
        logoText: "ABC",
        textColor: "black",
        shape: "Circle",
        shapeColor: "red",
      };
      const circle = new Circle(userData);
      const renderedSVG = circle.render();

      // Fix the quotes around "ABC" in the expected string
      const expectedSVG = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="100" r="80" fill="${userData.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${userData.textColor}">${userData.logoText}</text>
      </svg>`;

      expect(renderedSVG).toEqual(expectedSVG);
    });
  });

  describe("Square", () => {
    test("should return an SVG string that has a logo text of 'ABC' that has a color of 'black' and a 'Square' background that is 'blue'.", () => {
      const userData = {
        logoText: "ABC",
        textColor: "black",
        shape: "Square",
        shapeColor: "red",
      };
      const square = new Square(userData);
      const renderedSVG = square.render();
      const expectedSVG = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="${userData.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${userData.textColor}">${userData.logoText}</text>
      </svg>`;
      expect(renderedSVG).toEqual(expectedSVG);
    });
  });

  describe("Triangle", () => {
    it("should return an SVG string that has a logo text of 'ABC' that has a color of 'black' and a 'Triangle' background that is 'red'.", () => {
      const userData = {
        logoText: "ABC",
        textColor: "black",
        shape: "Triangle",
        shapeColor: "red",
      };
      const triangle = new Triangle(userData);
      const renderedSVG = triangle.render();
      const expectedSVG = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="150,20 280,180 20,180" fill="${userData.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${userData.textColor}">${userData.logoText}</text>
      </svg>`;
      expect(renderedSVG).toEqual(expectedSVG);
    });
  });
});
