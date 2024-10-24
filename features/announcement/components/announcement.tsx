import { Data } from "../types/scheme";
import { iconMappings } from "../utils/mappings";

type Props = Data;

export default function Announcement({ type, title, description }: Props) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 text-body-large">
      <div className="flex flex-col gap-4">
        {iconMappings[type]}
        <div className="text-title-large">{title}</div>
      </div>
      <p>{description}</p>
    </div>
  );
}
