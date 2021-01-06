"use strict";

const { MarkovMachine, capitalize } = require("./markov");

describe("capitalize", function() {
  test("it capitalizes a sentence", function() {
    const capitalizedSentence = capitalize("the cat");
    expect(capitalizedSentence).toEqual("The cat");
  })
})

describe("MarkovMachine", function() {
  
  let words = "the cat in the hat";
  let mm; 
  let catChain = {
    the: ["cat", "hat"],
    cat: ["in"],
    in: ["the"],
    hat: [null],
  };

  beforeEach(function () {
    mm = new MarkovMachine(words);
  });
  // TODO: group this test with line 53 (very similar)
  test("makeChains makes a valid chain", function () {
    let newChain = mm.makeChains(words.split(" "));
    expect(newChain).toEqual(catChain);
  });

  test("makeChains has lists with null values", function () {
    let newChain = mm.makeChains("the hat in the hat".split(" "));
    expect(newChain).toEqual({
      the: ["hat", "hat"],
      in: ["the"],
      hat: ["in", null],
    });
  });

  test("gets a valid story text", function () {
    // a b c d 
    // TODO: test that we haven't violated rules of Markov chain (next word has to follow word in original text)
    expect(mm.getText(numWords = 50)).toEqual(expect.any(String));
  });

  test("length of story text is valid", function () {
    let text = mm.getText(numWords = 50).split(" ");
    expect(text.length).toEqual(50);
  });

  test("length of story text defaults to 100 when given no input", function () {
    let text = mm.getText().split(" ");
    expect(text.length).toEqual(100);
  });

  test("constructor makes correct chain", function () {
    expect(mm.chains).toEqual(catChain);
  });
  
})