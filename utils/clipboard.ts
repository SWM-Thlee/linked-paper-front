export async function copyToClipboard(
  text: string,
  callback?: (success: boolean) => void,
) {
  try {
    await navigator.clipboard.writeText(text);
    callback?.(true);
  } catch (error) {
    callback?.(false);
  }
}
