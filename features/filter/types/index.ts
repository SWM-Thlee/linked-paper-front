import * as AttributeTypes from "./attribute";
import * as BaseTypes from "./base";
import * as SampleTypes from "./sample";
import * as IdentifyTypes from "./identify";
import * as BuildTypes from "./filter";
import * as StoreTypes from "./store";

export namespace Filter {
  export import Attribute = AttributeTypes;
  export import Base = BaseTypes;
  export import Store = StoreTypes;
  export import Sample = SampleTypes;
  export import Build = BuildTypes;
  export import Identify = IdentifyTypes;
}
