export interface Filters {
  name: string;
  points: Range;
  level: Range;
  genres: string[];
  hideExpired: boolean;
}

export interface Range {
  min: number;
  max: number;
}
