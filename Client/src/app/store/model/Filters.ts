export interface Filters {
  name: string;
  price: Range;
  level: Range;
  genres: string[];
  hideExpired: boolean;
}

export interface Range {
  min: number;
  max: number;
}
