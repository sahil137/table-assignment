import { WineData, WineGroupedData } from "./types";

//* Functions to calculate Mean, Median and Mode

export const calculateMean = (values: number[]) => {
  let sum = 0;
  values.forEach((element) => {
    // Check for valid element
    if (!!element) {
      sum += element;
    }
  });
  return sum / values.length;
};

export const calculateMedian = (values: number[]) => {
  const sorted = values.sort();
  const mid = Math.floor(sorted.length / 2);
  // return mid according to odd/even length of array
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid] / 2;
};

export const calculateMode = (values: number[]) => {
  const countOfValues: { [key: number]: number } = {};

  values.forEach((element) => {
    countOfValues[element] = (countOfValues[element] || 0) + 1;
  });

  // Count the max number of times a value has occured
  let ans;

  let max = 0;

  Object.entries(countOfValues).forEach(([key, count]) => {
    if (count > max) {
      ans = parseFloat(key);
      max = count;
    }
  });
  return ans || 0;
};

//* Function to group data by alcohol class

export const getGroupedByAlcoholClass = (data: WineData[]) => {
  const groupedData: WineGroupedData = {};
  data.forEach((element) => {
    const alcoholClass = element.Alcohol;
    if (!groupedData[alcoholClass]) {
      groupedData[alcoholClass] = [];
    }
    groupedData[alcoholClass].push(element);
  });
  return groupedData;
};

//* Calculate Gamma
export const calculateGamma = (data: WineData[]) => {
  return data.map((element) => {
    const { Ash, Hue, Magnesium } = element;
    const gamma = (parseFloat(`${Ash}`) * Hue) / Magnesium;
    return { ...element, gamma: gamma };
  });
};
