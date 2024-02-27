export const findSequence = (
  numbers: number[],
  increasing?: boolean
): number[] => {
  let maxLength = 1;
  let currentLength = 1;
  let endIndex = 0;

  for (let i = 1; i < numbers.length; i++) {
    const condition = increasing
      ? numbers[i] > numbers[i - 1]
      : numbers[i] < numbers[i - 1];
    if (condition) {
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
