import * as FilterTypes from "./filter";
import * as Filter_V2Types from "./filter_v2";
import * as QueryTypes from "./query";
import * as EditTypes from "./edit";
import * as ApiTypes from "./api";
import * as Tabs from "./tab";

export namespace Search {
  export import Filter = FilterTypes;
  export import Filter_V2 = Filter_V2Types;
  export import Query = QueryTypes;
  export import Edit = EditTypes;
  export import Api = ApiTypes;
  export import Settings = Tabs;
}
