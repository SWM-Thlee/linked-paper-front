import * as FilterTypes from "./filter";
import * as QueryTypes from "./query";
import * as EditTypes from "./edit";
import * as ResultTypes from "./result";
import * as ApiTypes from "./api";
import * as Tabs from "./tab";

export namespace Search {
  export import Filter = FilterTypes;
  export import Query = QueryTypes;
  export import Edit = EditTypes;
  export import Result = ResultTypes;
  export import Api = ApiTypes;
  export import Settings = Tabs;
}
