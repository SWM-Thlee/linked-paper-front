import * as FilterTypes from "./filter";
import * as QueryTypes from "./query";
import * as EditTypes from "./edit";
import * as ResultTypes from "./result";
import * as Tabs from "./tab";

/**
 * 모든 타입 정의(및 보조 객체)를 한 번에 접근할 수 있습니다.
 */
export namespace Search {
  export import Filter = FilterTypes;
  export import Query = QueryTypes;
  export import Edit = EditTypes;
  export import Result = ResultTypes;
  export import Settings = Tabs;
}
