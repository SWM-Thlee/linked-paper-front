import { Analytics } from "firebase/analytics";
import { createContext } from "react";

export const AnalyticsProviderContext = createContext<Analytics | null>(null);
