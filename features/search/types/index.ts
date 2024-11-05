import * as FilterTypes from "./filter";
import * as FilterV2Types from "./filter-v2";
import * as QueryTypes from "./query";
import * as EditTypes from "./edit";
import * as ApiTypes from "./api";
import * as Tabs from "./tab";

export namespace Search {
  export import Filter = FilterTypes;
  export import FilterV2 = FilterV2Types;
  export import Query = QueryTypes;
  export import Edit = EditTypes;
  export import Api = ApiTypes;
  export import Settings = Tabs;
}
