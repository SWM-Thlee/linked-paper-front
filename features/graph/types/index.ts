import * as ElementTypes from "./element";
import * as ConfigTypes from "./config";
import * as EventTypes from "./event";
import * as RenderTypes from "./render";
import * as SidebarTypes from "./sidebar";

export namespace Graph {
  export import Element = ElementTypes;
  export import Config = ConfigTypes;
  export import Event = EventTypes;
  export import Render = RenderTypes;
  export import Sidebar = SidebarTypes;
}
