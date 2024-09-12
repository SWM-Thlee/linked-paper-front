import { MdLens } from "react-icons/md";
import IconWrapper from "./wrapper";

const SpliterIcon = IconWrapper({
  type: "react-icons",
  baseComponent: MdLens,
  defaultProps: { size: 4 },
});

export default SpliterIcon;
