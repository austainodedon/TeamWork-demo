const expect = require("chai").expect;
const server = require("../server");

describe("test", () => {
  it("should return a string", () => {
    expect("Hi Prospecting Andelans Hello API this is DevC").to.equal(
      "Hi Prospecting Andelans Hello API this is DevC"
    );
  });
});
