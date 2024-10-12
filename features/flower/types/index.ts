import * as GraphTypes from "./graph";
import * as ConfigTypes from "./config";
import * as EventTypes from "./event";
import * as RenderTypes from "./render";
import * as ApiTypes from "./api";
import * as QueryTypes from "./query";

export namespace Flower {
  export import Graph = GraphTypes;
  export import Config = ConfigTypes;
  export import Event = EventTypes;
  export import Render = RenderTypes;
  export import Api = ApiTypes;
  export import Query = QueryTypes;
}
