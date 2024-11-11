export const SIMILARITY_LEVELS = [
  { over: 0.66, level: 3, label: "High" },
  { over: 0.33, level: 2, label: "Medium" },
  { over: 0, level: 1, label: "Low" },
];

export function getSimilarityLevel(similarity: number) {
  const similarityLevel =
    SIMILARITY_LEVELS.find((l) => similarity > l.over) ??
    SIMILARITY_LEVELS[SIMILARITY_LEVELS.length - 1];

  return { level: similarityLevel.level, label: similarityLevel.label };
}
