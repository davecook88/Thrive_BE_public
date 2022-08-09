export interface Review {
  id: number;
  reviewer: string;
  body: string;
}

export interface ReviewCarouselProps {
  reviews?: Review[];
}
