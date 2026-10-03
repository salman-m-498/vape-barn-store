import type { Metadata } from "next";
import { FlavourFinderClient } from "./flavour-finder-client";

export const metadata: Metadata = {
  title: "Cloude's Flavour Finder | Vape Barn",
  description:
    "Answer a few quick questions and Cloude will point you at the right e-liquid. Fruit, dessert, tobacco or icy — find your flavour.",
};

export default function FlavourFinderPage() {
  return <FlavourFinderClient />;
}
