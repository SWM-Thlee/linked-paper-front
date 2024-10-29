import * as Sentry from "@sentry/nextjs";
import { Subject, Type } from "../types/scheme";

export function sendSentryFeedback({
  name,
  email,
  message,
  type,
  subject,
}: {
  name: string;
  email: string;
  message: string;
  type: Type;
  subject: Subject;
}) {
  Sentry.captureFeedback(
    {
      name,
      email,
      message,
      tags: {
        type,
        subject,
      },
    },
    { includeReplay: true },
  );
}
