"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/ui/button";
import FieldContainer from "@/ui/container/field-container";
import { Dialog } from "@/ui/dialog";
import AddIcon from "@/ui/icons/add";
import FeedbackIcon from "@/ui/icons/feedback";
import TextArea from "@/ui/text-area";
import TextField from "@/ui/text-field";
import VisuallyHidden from "@/ui/visually-hidden";
import { sendSentryFeedback } from "../utils/sentry";

export type FeedbackProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Feedback({
  title = "Feedback",
  children,
}: FeedbackProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(() => {
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    sendSentryFeedback({ name, email, message });
    toast.success("Feedback submitted!");
    setName("");
    setEmail("");
    setMessage("");
    setOpen(false);
  }, [name, email, message]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <VisuallyHidden>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>User Feedback</Dialog.Description>
      </VisuallyHidden>
      <Dialog.Content>
        <div className="flex w-[30rem] flex-col gap-8">
          <div className="flex items-center gap-4">
            <FeedbackIcon />
            <div className="text-title-large">{title}</div>
          </div>
          <FieldContainer title="Name" ui_size="medium">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              ui_size="medium"
              ui_color="secondary"
              type="text"
              placeholder="Enter your name"
            />
          </FieldContainer>
          <FieldContainer title="Email" ui_size="medium">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ui_size="medium"
              ui_color="secondary"
              type="email"
              placeholder="Enter your email"
            />
          </FieldContainer>
          <FieldContainer title="Message" ui_size="medium">
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ui_size="medium"
              ui_color="secondary"
              rows={15}
            />
          </FieldContainer>
          <Button
            ui_color="secondary"
            className="flex items-center justify-center gap-2"
            onClick={onSubmit}
          >
            <AddIcon /> Submit Feedback
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
