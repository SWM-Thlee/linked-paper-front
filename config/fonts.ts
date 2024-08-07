import { Playfair_Display, Urbanist } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export { playfair, urbanist };
