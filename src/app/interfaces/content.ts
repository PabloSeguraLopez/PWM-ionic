export interface Content {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  synopsis: string;
  releaseDate: Date;
  genres: string[];
  rating: number;
  durationInMinutes?: number;
  chapters?: number;
  episodes?: number;
  availableOn: string[];
  reviews: string[];
}
