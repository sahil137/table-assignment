export interface WineData {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number | string;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number | string;
  "Nonflavanoid phenols": number | string;
  Proanthocyanins: number | string;
  "Color intensity": number | string;
  Hue: number;
  "OD280/OD315 of diluted wines": number | string;
}

export interface WineGroupedData {
  [key: number]: WineData[];
}

export type TableData = {
  mean: number;
  median: number;
  mode: number;
};

export interface WineDataWithGamma extends WineData {
  gamma: number;
}
