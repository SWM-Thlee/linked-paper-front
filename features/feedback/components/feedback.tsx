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
import CheckBox from "@/ui/check-box";
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
  const [isSpecificUser, setIsSpecificUser] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(() => {
    if (!description) {
      toast.error("Please fill the description.");
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
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2">
                <CheckBox
                  checked={isSpecificUser}
                  onCheckedChange={(checked) =>
                    setIsSpecificUser(checked !== false)
                  }
                />
                <div className="text-label-large">
                  want to be remembered as one who helped build this service.
                </div>
              </div>
              {isSpecificUser && (
                <>
                  <FieldContainer field="Name" ui_size="medium">
                    <TextField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      ui_size="medium"
                      ui_color="secondary"
                      type="text"
                      placeholder="What's your name?"
                    />
                  </FieldContainer>
                  <FieldContainer field="Email" ui_size="medium">
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      ui_size="medium"
                      ui_color="secondary"
                      type="email"
                      placeholder="hello@example.com"
                    />
                  </FieldContainer>
                </>
              )}
            </div>
            <div className="flex flex-col gap-8">
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
            </div>
            <FieldContainer field="Description (required)" ui_size="medium">
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                ui_size="medium"
                ui_color="secondary"
                rows={10}
              />
            </FieldContainer>
          </div>
          <Button
            ui_color="secondary"
            className="flex items-center justify-center gap-2 text-label-large"
            onClick={onSubmit}
          >
            <AddIcon /> <span>Submit Feedback</span>
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
