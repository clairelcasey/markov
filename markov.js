"use strict";
/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text. Make markov chains. */

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.chains = this.makeChains(words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    const chains = {};
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (chains[word]) {
        chains[word].push(words[i + 1] || null);
      } else {
        chains[word] = [words[i + 1] || null];
      }
    }
    return chains;
  }


  /** Given a maximum number of words, return a paragraph of the number of 
   * words based on markov chains. */

  getText(numWords = 100) {
    this.wordCount = 0;
    let sentences = [];
    while (this.wordCount < numWords) {
      sentences.push(this.getSentence(numWords));
    }

    return sentences.join(' ');

  }

  /** Helper method: Return a sentence based on markov chains. */ 

  getSentence(numWords) {
    const idx = Math.floor(Math.random() * Object.keys(this.chains).length);
    const firstWord = Object.keys(this.chains)[idx];
    // TODO: potentially break these 3 lines into a function (pick a thing randomly from a list)
    let nextWordOptions = this.chains[firstWord];
    let nextWordIdx = Math.floor(Math.random() * nextWordOptions.length);
    let nextWord = nextWordOptions[nextWordIdx];

    const sentence = [capitalize(firstWord)]
    this.wordCount ++;

    while (nextWord !== null && this.wordCount < numWords) {
      sentence.push(nextWord);
      nextWordOptions = this.chains[nextWord];
      nextWordIdx = Math.floor(Math.random() * nextWordOptions.length);
      nextWord = nextWordOptions[nextWordIdx];
      this.wordCount ++;
    }

    return sentence.join(' ') + '.';
  }
}


/** Helper function: Given a string, return a copy of the string with the 
 * first letter capitalized*/ 

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

module.exports = { 
  MarkovMachine,
  capitalize
};