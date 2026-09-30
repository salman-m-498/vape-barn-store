export const STORE = {
  name: "Vape Barn",
  tagline: "Vape Properly",
  mapsShareUrl: "https://share.google/hQxeDvww6nejMVT8V",
  mapsEmbedQuery: "Vape Barn Linbro Park Sandton",
  address: ["5b 2nd Ave", "Linbro Park, Sandton, 2065"],
  phone: "071 878 4279",
  email: "hello@vapebarn.co.za",
  whatsappNumber: "27718784279",
  whatsappDisplay: "+27 71 878 4279",
  instagramUrl: "https://www.instagram.com/vapebarn.sa/",
  mrdUrl:
    "https://www.mrd.com/delivery/store/vape-barn-sa-over-18-only-linbro-park/38034?latitude=-26.0847726&longitude=28.1222555&street_name=2nd+Road&suburb=Linbro+Park&town=Sandton&province=Gauteng&postal_code=2090&vertical=store&an=sdstandard_listuuuuuuun1fuuuuu",
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

export const WHATSAPP_URL = `https://wa.me/${STORE.whatsappNumber}`;

export function whatsappUrl(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export function enquireForProduct(name: string) {
  return whatsappUrl(
    `Hi Vape Barn, I'd like to enquire about the ${name}. Is it available?`,
  );
}

// Simple client-side gate for the /admin page. This is not real security —
// it only stops casual visitors. Override at build time via
// NEXT_PUBLIC_ADMIN_PASSCODE.
export const ADMIN_PASSCODE =
  process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "vapebarn-admin";
