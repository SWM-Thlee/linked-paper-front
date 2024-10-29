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
import LabelButton from "@/ui/label-button";
import TipIcon from "@/ui/icons/tip";
import { sendSentryFeedback } from "../utils/sentry";
import { Subject, Type } from "../types/scheme";

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
  const [description, setDescription] = useState("");
  const [type, setType] = useState<Type>(Type.FEEDBACK);
  const [subject, setSubject] = useState<Subject>(Subject.ALL);
  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(() => {
    if (!name || !email || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    sendSentryFeedback({ name, email, message: description, type, subject });
    toast.success("Feedback Submitted!");

    /* Submit 후 form 정보를 초기화합니다. */
    setName("");
    setEmail("");
    setDescription("");
    setType(Type.FEEDBACK);
    setSubject(Subject.ALL);
    setOpen(false);
  }, [name, email, description, type, subject]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <VisuallyHidden>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>User Feedback</Dialog.Description>
      </VisuallyHidden>
      <Dialog.Content>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <FeedbackIcon />
            <div className="text-title-large">{title}</div>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-1 flex-col gap-8">
              <div className="flex flex-col gap-8 rounded-4 bg-light-secondaryContainer p-6 text-light-onSecondaryContainer dark:bg-dark-secondaryContainer dark:text-dark-onSecondaryContainer">
                <div className="flex flex-col gap-8 text-title-large">
                  <TipIcon ui_size="large" />
                  Your Feedback Shapes Our Service!
                </div>
                <div className="text-body-medium">
                  Tell us how we can make this service better for you! Whether
                  it’s a bug, a feature you’d love, or any other improvement
                  idea, your insights are valuable to us. Please share your
                  thoughts—big or small! Every piece of feedback helps us create
                  a better experience for you and the community.
                </div>
              </div>
              <div className="flex min-w-[30rem] flex-1 flex-col gap-8">
                <FieldContainer field="Name (required)" ui_size="medium">
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ui_size="medium"
                    ui_color="secondary"
                    type="text"
                    placeholder="What's your name?"
                  />
                </FieldContainer>
                <FieldContainer field="Email (required)" ui_size="medium">
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ui_size="medium"
                    ui_color="secondary"
                    type="email"
                    placeholder="hello@example.com"
                  />
                </FieldContainer>
              </div>
            </div>
            <div className="w-[1px] rounded-circle bg-light-outline/25 dark:bg-dark-outline/25" />
            <div className="flex min-w-[30rem] flex-1 flex-col gap-8">
              <FieldContainer field="Type" ui_size="medium">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(Type).map(([feedbackType, key]) => (
                    <LabelButton
                      ui_variant={type === key ? "default" : "bordered"}
                      key={key}
                      ui_size="small"
                      onClick={() => setType(key)}
                    >
                      {feedbackType}
                    </LabelButton>
                  ))}
                </div>
              </FieldContainer>
              <FieldContainer field="Subject" ui_size="medium">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(Subject).map(([subjectType, key]) => (
                    <LabelButton
                      ui_color="tertiary"
                      ui_variant={subject === key ? "default" : "bordered"}
                      key={key}
                      onClick={() => setSubject(key)}
                      ui_size="small"
                    >
                      {subjectType}
                    </LabelButton>
                  ))}
                </div>
              </FieldContainer>
              <FieldContainer field="Description (required)" ui_size="medium">
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  ui_size="medium"
                  ui_color="secondary"
                  rows={15}
                />
              </FieldContainer>
            </div>
          </div>
          <Button
            ui_color="secondary"
            className="flex items-center justify-center gap-2 text-label-large"
            onClick={onSubmit}
          >
            <AddIcon /> Submit Feedback
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
