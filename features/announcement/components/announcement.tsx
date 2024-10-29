import InfoIcon from "@/ui/icons/info";
import { Data } from "../types/scheme";
import { iconMappings } from "../utils/mappings";

type Props = Data;

export default function Announcement({ type, title, description, ps }: Props) {
  return (
    <div className="group flex flex-col">
      <section className="max-h-[14rem] overflow-y-auto rounded-t-4 bg-light-surfaceContainerHigh p-6 text-light-onSurface scrollbar group-only:rounded-4 dark:bg-dark-surfaceContainerHigh dark:text-dark-onSurface">
        <div className="flex h-full flex-col justify-between gap-6 text-body-large">
          <div className="flex flex-col gap-4">
            {iconMappings[type]}
            <div className="text-title-large">{title}</div>
          </div>
          <p>{description}</p>
        </div>
      </section>
      {ps && (
        <div className="flex items-center gap-2 rounded-b-4 bg-light-secondaryContainer p-6 text-label-large text-light-onSecondaryContainer scrollbar dark:bg-dark-secondaryContainer dark:text-dark-onSecondaryContainer">
          <InfoIcon ui_size="small" />
          {ps}
        </div>
      )}
    </div>
  );
}
