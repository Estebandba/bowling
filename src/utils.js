const isSpare = (frameScore) => {
  return frameScore === 10;
};

const spareBonus = (frameScore, rollsArray, rollNumber) => {
  return frameScore + rollsArray[rollNumber + 2];
};

const isStrike = (rollsArray, rollNumber) => {
  return rollsArray[rollNumber] === 10;
};

const strikeBonus = (rollsArray, rollNumber) => {
  return (
    rollsArray[rollNumber] +
    rollsArray[rollNumber + 1] +
    rollsArray[rollNumber + 2]
  );
};

module.exports = { isSpare, spareBonus, isStrike, strikeBonus };
