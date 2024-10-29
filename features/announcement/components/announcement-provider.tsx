import { DEFAULT_ANNOUNCEMENT } from "../utils/mappings";
import Announcement from "./announcement";

export default function AnnouncementProvider() {
  return <Announcement {...DEFAULT_ANNOUNCEMENT} />;
}
