export const decreaseSequence = (numbers: number[]): number[] => {
  let maxLength = 1;
  let currentLength = 1;
  let endIndex = 0;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < numbers[i - 1]) {
      currentLength++;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        endIndex = i;
      }
    } else {
      currentLength = 1;
    }
  }

  const startIndex = endIndex - maxLength + 1;
  return numbers.slice(startIndex, endIndex + 1);
};
