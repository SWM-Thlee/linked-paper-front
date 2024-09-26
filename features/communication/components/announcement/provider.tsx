import { DEFAULT_ANNOUNCEMENT } from "../../utils/announcement";
import Announcement from "./component";

export default function AnnouncementProvider() {
  return (
    <section className="h-[12rem] overflow-y-auto rounded-4 bg-light-surfaceContainerHigh p-6 text-light-onSurface scrollbar dark:bg-dark-surfaceContainerHigh dark:text-dark-onSurface">
      <Announcement {...DEFAULT_ANNOUNCEMENT} />
    </section>
  );
}
