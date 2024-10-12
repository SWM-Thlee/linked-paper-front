import InfoIcon from "@/ui/icons/info";
import TipIcon from "@/ui/icons/tip";
import WarningIcon from "@/ui/icons/warning";
import DangerIcon from "@/ui/icons/danger";
import SuccessIcon from "@/ui/icons/success";
import ThumbUpIcon from "@/ui/icons/thumb-up";
import BugIcon from "@/ui/icons/bug";
import QuestionIcon from "@/ui/icons/question";
import QuoteIcon from "@/ui/icons/quote";

import { Data, Type } from "../types/scheme";

export const iconMappings: { [type in Type]: React.ReactNode } = {
  [Type.INFO]: <InfoIcon ui_size="large" />,
  [Type.TIP]: <TipIcon ui_size="large" />,
  [Type.WARNING]: <WarningIcon />,
  [Type.FAILURE]: <DangerIcon />,
  [Type.SUCCESS]: <SuccessIcon />,
  [Type.SUGGESTION]: <ThumbUpIcon />,
  [Type.BUG]: <BugIcon />,
  [Type.QUESTION]: <QuestionIcon />,
  [Type.QUOTE]: <QuoteIcon />,
};

export const DEFAULT_ANNOUNCEMENT: Data = {
  type: Type.TIP,
  title: "Are you new to Linked Paper?",
  description: `Don't look for specific keywords one by one to find the thesis you want,
        but if you enter the information you want directly, you will find the
        thesis that is most similar to the meaning. Type any sentence in the
        search box below!`,
};
