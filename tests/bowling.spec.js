var Bowling = require('../src/bowling');

describe('Bowling', function () {
  function previousRolls(bowling, rolls) {
    for (var i = 0; i < rolls.length; i++) {
      bowling.roll(rolls[i]);
    }
  }
  describe('Check game can be scored correctly.', function () {
    it('should be able to score a game with all gutterballs', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(0);
    });

    it('should be able to score a game with no strikes or spares', function () {
      var rolls = [3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6, 3, 6];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(90);
    });

    it('a spare followed by zeros is worth ten points', function () {
      var rolls = [6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(10);
    });

    it('points scored in the roll after a spare are counted twice', function () {
      var rolls = [6, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(16);
    });

    it('consecutive spares each get a one-roll bonus', function () {
      var rolls = [5, 5, 3, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(31);
    });

    it('should allow fill ball the last frame is a spare', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 7];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(17);
    });

    it('a strike earns ten  points in a frame with a single roll', function () {
      var rolls = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(10);
    });

    it('points scored in the two rolls after a strike are counted twice as a bonus', function () {
      var rolls = [10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(26);
    });

    it('should be able to score multiple strikes in a row', function () {
      var rolls = [10, 10, 10, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(81);
    });

    it('should allow fill balls when the last frame is a strike', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 1];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(18);
    });

    it('rolling a spare with the two-roll bonus does not get a bonus roll', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 3];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(20);
    });

    it('strikes with the two-roll bonus do not get bonus rolls', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(30);
    });

    it('a strike with the one-roll bonus after a spare in the last frame does not get a bonus', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 10];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(20);
    });

    it('should be able to score a perfect game', function () {
      var rolls = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(300);
    });
  });

  describe('Check game rules.', function () {
    it('rolls cannot score negative points', function () {
      var bowling = new Bowling();
      expect(function () {bowling.roll(-1);}).toThrow(new Error('Negative roll is invalid'));
    });

    it('a roll cannot score more than 10 points', function () {
      var bowling = new Bowling();
      expect(function () {bowling.roll(11);}).toThrow( new Error('Pin count exceeds pins on the lane'));
    });

    it('two rolls in a frame cannot score more than 10 points', function () {
      var bowling = new Bowling();
      bowling.roll(5);
      expect(function () {bowling.roll(6);}).toThrow( new Error('Pin count exceeds pins on the lane'));
    });

    it('bonus roll after a strike in the last frame cannot score more than 10 points', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.roll(11); }).toThrow(
        new Error('Pin count exceeds pins on the lane'));
    });

    it('two bonus rolls after a strike in the last frame cannot score more than 10 points', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () {bowling.roll(6);}).toThrow( new Error('Pin count exceeds pins on the lane'));
    });

    it('two bonus rolls after a strike in the last frame can score more than 10 points if one is a strike', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 6];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(bowling.score()).toEqual(26);
    });

    it('the second bonus roll after a strike in the last frame cannot be a strike if the first one is not a strike', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 6];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.roll(10); }).toThrow(
        new Error('Pin count exceeds pins on the lane'));
    });

    it('the second bonus roll after a strike in the last frame cannot score more than 10 points', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.roll(11); }).toThrow(
        new Error('Pin count exceeds pins on the lane'));
    });

    it('an unstarted game cannot be scored', function () {
      var rolls = [];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.score(); }).toThrow(
        new Error('Score cannot be taken until the end of the game'));
    });

    it('an incomplete game cannot be scored', function () {
      var rolls = [0, 0];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.score(); }).toThrow(
        new Error('Score cannot be taken until the end of the game'));
    });

    it('cannot roll if game already has 10 frames', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.roll(0); }).toThrow(
        new Error('Cannot roll after game is over'));
    });

    it('bonus rolls for a strike in the last frame must be rolled before score can be calculated', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.score(); }).toThrow(
        new Error('Score cannot be taken until the end of the game'));
    });

    it('both bonus rolls for a strike in the last frame must be rolled before score can be calculated', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () {bowling.score(); }).toThrow(
        new Error('Score cannot be taken until the end of the game'));
    });

    it('bonus roll for a spare in the last frame must be rolled before score can be calculated', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.score(); }).toThrow(
        new Error('Score cannot be taken until the end of the game'));
    });

    it('cannot roll after bonus roll for a spare', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 2];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.roll(2); }).toThrow(
        new Error('Cannot roll after game is over'));
    });

    it('cannot roll after bonus rolls for a strike', function () {
      var rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 3, 2];
      var bowling = new Bowling();
      previousRolls(bowling, rolls);
      expect(function () { bowling.roll(2); }).toThrow(
        new Error('Cannot roll after game is over'));
    });
  });
});