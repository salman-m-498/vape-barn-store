export type Review = {
  name: string;
  rating: number;
  text: string;
  when?: string;
};

export const GOOGLE_LINK = "https://share.google/aVa0AXYpkc3kepFvY";

// Pulled from the Google Business reviews export. 10 reviews, all 5 stars.
export const REVIEW_SUMMARY = {
  rating: 5.0,
  count: 10,
};

export const REVIEWS: Review[] = [
  {
    name: "Aman Ali",
    rating: 5,
    text: "This place is amazing with a great collection and the staff are very friendly and eager to help. 100% would recommend.",
    when: "Aug 2026",
  },
  {
    name: "Uwais Salie",
    rating: 5,
    text: "Excellent customer service. Friendly staff always willing to go the extra mile to make your vaping experience enjoyable.",
    when: "Aug 2026",
  },
  {
    name: "Hammaad Munshi",
    rating: 5,
    text: "Great place and wonderful customer service, would highly recommend this place.",
    when: "Aug 2026",
  },
  {
    name: "Laaiqah Ginden",
    rating: 5,
    text: "Excellent customer service and reasonable prices.",
    when: "Aug 2026",
  },
  {
    name: "AK .b",
    rating: 5,
    text: "Excellent service and friendly staff.",
    when: "Sep 2026",
  },
  {
    name: "Asger Mia",
    rating: 5,
    text: "Good service, good pricing.",
    when: "Sep 2026",
  },
];
