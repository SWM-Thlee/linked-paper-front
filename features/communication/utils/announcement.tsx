import InfoIcon from "@/ui/icons/info";
import TipIcon from "@/ui/icons/tip";
import WarningIcon from "@/ui/icons/warning";
import DangerIcon from "@/ui/icons/danger";
import SuccessIcon from "@/ui/icons/success";
import ThumbUpIcon from "@/ui/icons/thumb-up";
import BugIcon from "@/ui/icons/bug";
import QuestionIcon from "@/ui/icons/question";
import QuoteIcon from "@/ui/icons/quote";

import { AnnouncementData, AnnouncementType } from "../types/announcement";

export const iconMappings: { [type in AnnouncementType]: React.ReactNode } = {
  [AnnouncementType.INFO]: <InfoIcon ui_size="large" />,
  [AnnouncementType.TIP]: <TipIcon ui_size="large" />,
  [AnnouncementType.WARNING]: <WarningIcon />,
  [AnnouncementType.FAILURE]: <DangerIcon />,
  [AnnouncementType.SUCCESS]: <SuccessIcon />,
  [AnnouncementType.SUGGESTION]: <ThumbUpIcon />,
  [AnnouncementType.BUG]: <BugIcon />,
  [AnnouncementType.QUESTION]: <QuestionIcon />,
  [AnnouncementType.QUOTE]: <QuoteIcon />,
};

export const DEFAULT_ANNOUNCEMENT: AnnouncementData = {
  type: AnnouncementType.TIP,
  title: "Are you new to Linked Paper?",
  description: `Don't look for specific keywords one by one to find the thesis you want,
        but if you enter the information you want directly, you will find the
        thesis that is most similar to the meaning. Type any sentence in the
        search box below!`,
};
