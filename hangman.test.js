const { expect } = require('@jest/globals');
const Hangman = require('./hangman.js')

test('win state', () => {
    const game = new Hangman('medium', 6);
    game.play('m');
    game.play('e');
    game.play('d');
    expect(game.play('i').gameOver).toBe(false);
    expect(game.play('u').gameOver).toBe(true);
});

test('counts single letter multiple times if in string', () => {
    const game = new Hangman('panama', 6);

    let turn = game.play('a');

    expect(turn.gameOver).toBe(false);
    expect(turn.output).toStrictEqual(['_', 'a', '_', 'a', '_', 'a']);
    expect(turn.incorrectGuesses.size).toBe(0);
});

test('does not count incorrect guess twice', () => {
    const game = new Hangman('panama', 6);

    game.play('x');
    let turn = game.play('x');

    expect(turn.gameOver).toBe(false);
    expect(turn.output).toStrictEqual(['_', '_', '_', '_', '_', '_']);
    expect(turn.incorrectGuesses.size).toBe(1);
});

test('is case insensitive', () => {
    const game = new Hangman('panama', 6);

    game.play('A');
    let turn = game.play('P');

    expect(turn.gameOver).toBe(false);
    expect(turn.output).toStrictEqual(['p', 'a', '_', 'a', '_', 'a']);
    expect(turn.incorrectGuesses.size).toBe(0);
});

test('playing after game state is over results in no changes', () => {
    const game = new Hangman('panama', 4);

    game.play('v');
    game.play('w');
    expect(game.play('x').gameOver).toBe(false);

    let finalTurn = game.play('y');
    expect(finalTurn.gameOver).toBe(true);
    expect(finalTurn.incorrectGuesses.size).toBe(4);

    let extraTurn = game.play('a');
    expect(extraTurn.gameOver).toBe(true);
    expect(extraTurn.output).toStrictEqual(['_', '_', '_', '_', '_', '_']);
    expect(extraTurn.incorrectGuesses.size).toBe(4);
    expect(extraTurn.message).toStrictEqual("Game is over, play again!");
});

test('lose state', () => {
    const game = new Hangman('medium', 6);
    game.play('x');
    game.play('y');
    game.play('z');
    game.play('a');
    expect(game.play('b').gameOver).toBe(false);
    expect(game.play('c').gameOver).toBe(true);  
});

test('works with numbers?', () => {
    const game = new Hangman('a0120a', 6);
    game.play('1');
    game.play('2');
    game.play('a');
    expect(game.play('0').gameOver).toBe(true);
});