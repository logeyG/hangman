/*
Hangman

Secret word: 'medium'
Incorrect guesses allowed before losing: 6
Duplicate guesses are ignored
Player wins by guessing all letters in the secret word, or loses by running out of incorrect guesses

Output:
_ _ _ _ _ _
Incorrect guesses: 
Incorrect guesses left: 6

// guess 'd' (correct)

_ _ d _ _ _
Incorrect guesses: 
Incorrect guesses left: 6

// guess 'x' (incorrect)

_ _ d _ _ _
Incorrect guesses: x
Incorrect guesses left: 5

// guess 'y' (incorrect)

_ _ d _ _ _
Incorrect guesses: x, y
Incorrect guesses left: 4

// continue until win or lose
*/

class Hangman {
  constructor(word, limit) {

    this.incorrectGuesses = new Set();
    this.correctGuesses = new Set();
    this.lettersByIndices = new Map();
    this.output = [];
    this.gameOver = false;

    for (var i = 0; i < word.length; i++) {
      let w = word[i].toLowerCase();

      if (this.lettersByIndices.has(w)) {
        this.lettersByIndices.set(this.lettersByIndices.get(w).push(i));
      } else {
        this.lettersByIndices.set(w, [i]);
      }

      this.output.push('_');
      this.correctGuesses.add(w);
    }

    this.limit = limit;
  }

  play(letter) {
    if (this.gameOver) {
      return {
        "gameOver": this.gameOver,
        "output": this.output,
        "incorrectGuesses": this.incorrectGuesses,
        "message": "Game is over, play again!"
      }
    }

    letter = letter.toLowerCase();

    if (!this.lettersByIndices.has(letter)) {
      this.incorrectGuesses.add(letter)
    } else {
      this.correctGuesses.delete(letter);
      let values = this.lettersByIndices.get(letter);
      values.forEach(v => this.output[v] = letter);
    }

    //console.log(this.output.join(' '));
    //console.log('Incorrect guesses: ', Array.from(this.incorrectGuesses.values()).join(', '));
    //console.log('Incorrect guesses left: ', this.limit - this.incorrectGuesses.size);

    this.gameOver = this.correctGuesses.size === 0 || (this.limit - this.incorrectGuesses.size) === 0;

    return {
      "gameOver": this.gameOver,
      "output": this.output,
      "incorrectGuesses": this.incorrectGuesses
    }
  }
}

module.exports = Hangman;