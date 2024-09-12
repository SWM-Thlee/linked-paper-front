import { createContext } from "react";
import { SearchFilterEditorHook } from "@/features/search/hooks/filter/use-search-filter-editor";

export const EditorContext = createContext<SearchFilterEditorHook | null>(null);
