const { isStrike, strikeBonus, isSpare, spareBonus } = require("./utils");

function bowling() {
  const MAX_FRAME = 10;
  const FIRST_ROLL_LAST_FRAME = 9.5;
  const BONUS_ROLL = 3;
  const ONE_ROLL = 0.5;

  let rolls = [];

  let lastFrameCount = 0;
  let hasGameFinshed = false;
  let lastFrameArray = [];

  let frameCount = 0;
  let ballCount = 0;
  let isLastFrame = false;

  const lastFrameValidation = (numberOfPins) => {
    lastFrameArray = [...lastFrameArray, numberOfPins];
    // The last two rolls added should be less than 10
    if (isStrike(lastFrameArray, 0) && lastFrameCount > 1) {
      if (
        lastFrameArray[1] < MAX_FRAME &&
        lastFrameArray[1] + lastFrameArray[2] > MAX_FRAME
      ) {
        throw new Error("Pin count exceeds pins on the lane");
      }
    }
    // Should end the game when the last frame has an open frame
    if (
      lastFrameCount >= 1 &&
      lastFrameArray[lastFrameCount - 1] + lastFrameArray[lastFrameCount] < MAX_FRAME
    ) {
      hasGameFinshed = true;
      frameCount = MAX_FRAME;
    }
    // End the game if all the 3 rolls has been done
    if (lastFrameArray.length === BONUS_ROLL) {
      hasGameFinshed = true;
      frameCount = MAX_FRAME;
    }

    lastFrameCount++;
  };

  const gameValidation = (numberOfPins, ballCount, isLastFrame) => {
    if (hasGameFinshed) {
      throw new Error("Cannot roll after game is over");
    }
    if (Math.sign(numberOfPins) === -1) {
      throw new Error("Negative roll is invalid");
    }
    if (numberOfPins > MAX_FRAME) {
      throw new Error("Pin count exceeds pins on the lane");
    }
    // Check that two rolls are not greater than 10 if not stike
    if (
      !isStrike(rolls, ballCount) &&
      rolls.length === 2 &&
      rolls[ballCount] + rolls[ballCount + 1] > MAX_FRAME
    ) {
      throw new Error("Pin count exceeds pins on the lane");
    }
    isLastFrame && lastFrameValidation(numberOfPins);
  };

  const roll = (numberOfPins) => {
    // 1.First add all the pins to the rolls
    rolls = [...rolls, numberOfPins];
    ballCount++;

    if (!isLastFrame) {
      numberOfPins === MAX_FRAME ? frameCount++ : (frameCount += ONE_ROLL);
    }
    isLastFrame = frameCount >= FIRST_ROLL_LAST_FRAME;

    if (ballCount === 2) {
      ballCount = 0;
    }
    // 2. Validate the game
    gameValidation(numberOfPins, ballCount, isLastFrame);
  };

  // 3. Calculate score
  const score = () => {
    let totalScore = 0;
    let rollNumber = 0;
    if (frameCount === MAX_FRAME) {
      for (let frameNumber = 0; frameNumber < MAX_FRAME; frameNumber++) {
        // Check strike first than spare so we pass onto the next frame
        if (isStrike(rolls, rollNumber)) {
          totalScore += strikeBonus(rolls, rollNumber);
          rollNumber++;
          continue;
        }
        const frameScore = rolls[rollNumber] + rolls[rollNumber + 1]; // add two rolls

        if (isSpare(frameScore)) {
          totalScore += spareBonus(frameScore, rolls, rollNumber);
        } else {
          totalScore += frameScore; // open frame
        }
        rollNumber += 2; // As one frame has been processed add 2 to the number of rolls
      }
    }

    if (frameCount < FIRST_ROLL_LAST_FRAME || !hasGameFinshed) {
      throw new Error("Score cannot be taken until the end of the game");
    }

    return totalScore;
  };

  return { score, roll };
}
module.exports = bowling;
