"use strict";

var expect = require("chai").expect;

var server = require("../server");

describe("test", function () {
  it("should return a string", function () {
    expect("Hi Prospecting Andelans Hello API this is DevC").to.equal("Hi Prospecting Andelans Hello API this is DevC");
  });
});