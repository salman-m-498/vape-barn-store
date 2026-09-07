export const STORE = {
  name: "Vape Barn",
  tagline: "Vape Properly",
  mapsShareUrl: "https://share.google/hQxeDvww6nejMVT8V",
  mapsEmbedQuery: "Vape Barn Linbro Park Sandton",
  address: ["5b 2nd Ave", "Linbro Park, Sandton, 2065"],
  phone: "071 878 4279",
  email: "hello@vapebarn.co.za",
  hours: [
    { days: "Monday", time: "9 am - 6:30 pm" },
    { days: "Tuesday", time: "9 am - 6:30 pm" },
    { days: "Wednesday", time: "9 am - 6:30 pm" },
    { days: "Thursday", time: "9 am - 6:30 pm" },
    { days: "Friday", time: "9 am - 12 pm, 2 - 6:30 pm" },
    { days: "Saturday", time: "9 am - 4:30 pm" },
    { days: "Sunday", time: "9 am - 1:30 pm" },
  ],
  photos: [
    { src: "store1.png", caption: "The Barn" },
    { src: "store2.png", caption: "Inside" },
    { src: "store3.png", caption: "Come say hi" },
  ],
};

export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  STORE.mapsEmbedQuery,
)}&output=embed`;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STORE.mapsEmbedQuery,
)}`;
