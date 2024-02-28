export const findSequence = (
  numbers: number[],
  increasing?: boolean
): number[] => {
  let maxLength = 1;
  let currentLength = 1;
  let endIndex = 0;

  numbers.forEach((num, i) => {
    if (i !== 0) {
      const condition: boolean = increasing
        ? num > numbers[i - 1]
        : num < numbers[i - 1];
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
  });

  const startIndex = endIndex - maxLength + 1;
  return numbers.slice(startIndex, endIndex + 1);
};
