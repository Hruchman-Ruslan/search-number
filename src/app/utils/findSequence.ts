export const findSequence = (
  numbers: number[]
): { increasing: number[]; decreasing: number[] } => {
  let maxLength = 1;
  let currentLength = 1;
  let endIndex = 0;

  numbers.forEach((num, i) => {
    if (i !== 0) {
      if (num > numbers[i - 1]) {
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
  const increasing = numbers.slice(startIndex, endIndex + 1);
  const decreasing = increasing.slice().reverse();

  return { increasing, decreasing };
};
