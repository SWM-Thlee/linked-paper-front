// Feedback을 보낼 Mail을 나타냅니다.
export const DEFAULT_FEEDABCK_MAIL = process.env.NEXT_PUBLIC_FEEDBACK_MAIL;

type RequestProps = {
  customMailReceiver?: string;
  subject?: string;
  body?: string;
};

export function generateMailFeedbackRequest(props?: RequestProps) {
  const receiver = props?.customMailReceiver ?? DEFAULT_FEEDABCK_MAIL;

  return `mailto:${receiver}?subject=${props?.subject ?? ""}&body=${props?.body ?? ""}`;
}
