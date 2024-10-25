import * as Sentry from "@sentry/nextjs";

export function sendSentryFeedback({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  Sentry.captureFeedback(
    {
      name,
      email,
      message,
    },
    { includeReplay: true },
  );
}
