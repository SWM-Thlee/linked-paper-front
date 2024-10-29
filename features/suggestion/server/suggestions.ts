export default async function Suggestions({ amount }: { amount: number }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_ENDPOINT ?? "https://linked-paper.com"}/suggestion?amount=${amount}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Error from Suggestions: Failed to fetch Suggestions");
  }

  const result = await response.json();

  if (!result || !Array.isArray(result) || typeof result[0] !== "string") {
    throw new Error("Error from Suggestions: Invalid Response");
  }

  return result as string[];
}
