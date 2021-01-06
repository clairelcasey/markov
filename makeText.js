"use strict";
/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");
const fsP = require("fs/promises");
const axios = require("axios");

const path = process.argv[3];

/** 
 * Checks if path is file or url and returns the text 
 * from data source
 **/  
async function getText() {
  let text;
  if (process.argv[2] === "file") { 
    text = cat();
  } else if (process.argv[2] === "url") {
    text = webCat();
  }
  return text;
}

/** Helper method
 * Reads the text file and returns its text
 **/  
async function cat() {
  let text;

  try {
    text = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(`Error reading ${path}\n`, err.message);
    process.exit(1);
  }
  return text;
}

/** Helper method
 * Reads the url path and returns its data 
 **/  
async function webCat() {
  let resp;
  
  try {
    resp = await axios({
      method: "GET",
      url: path,
    });
  } catch (err) {
    console.error(`Error fetching ${path}\n`, err.message);
    process.exit(1);
  }

  return resp.data;
}

/**
 * gets the text and generates a MarkovChain with it, 
 * printing the story to console  
 **/  
async function start() {
  const text = await getText();
  let mm = new MarkovMachine(text);
  console.log(mm.getText());
}

start();
