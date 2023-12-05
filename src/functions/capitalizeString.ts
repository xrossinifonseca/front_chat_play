export const capitalizeString = (name: string) => {
  const nameSplit = name.split(" ");

  const fullName: string[] = [];

  for (const partName of nameSplit) {
    if (partName) {
      const splitLetters = partName.split("");

      splitLetters[0] = splitLetters[0].toUpperCase();

      const capitalizedName = splitLetters.join("");

      fullName.push(capitalizedName);
    }
  }

  return fullName.join(" ");
};
