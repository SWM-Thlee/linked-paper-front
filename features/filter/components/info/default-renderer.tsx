import Button from "@/ui/button";
import CheckBox from "@/ui/check-box";
import { Attribute } from "../../types";
import { Attributes } from "../../types/attribute";

export function SelectDefaultRenderer({ value }: Attribute.Select) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value?.info[0] ?? "Unknown"}
    </Button>
  );
}

export function MultiSelectDefaultRenderer({ value }: Attribute.MultiSelect) {
  return Object.values(value ?? {}).map((content) => (
    <Button ui_variant="bordered" ui_size="small" key={content.itemID}>
      {content?.info[0] ?? "Unknown"}
    </Button>
  ));
}

export function CategoryDefaultRenderer({ value }: Attribute.Category) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value ?? "Unknown"}
    </Button>
  );
}

export function CheckDefaultRenderer({ value }: Attribute.Check) {
  return <CheckBox defaultChecked={value} disabled ui_variant="bordered" />;
}

export function NumberRangeDefaultRenderer({ value }: Attribute.NumberRange) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value?.min ?? "-∞"} ~ {value?.max ?? "∞"}
    </Button>
  );
}

export function DataRangeDefaultRenderer({ value }: Attribute.DataRange) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value?.min ?? "Unknown"} ~ {value?.max ?? "Unknown"}
    </Button>
  );
}

// 각 Attribute에 대한 기본 렌더러(컴포넌트)입니다.
export function AttributeDefaultRenderer({ type, value }: Attribute.Type) {
  switch (type) {
    case Attributes.SELECT:
      return SelectDefaultRenderer({ type, value });
    case "multi_select":
      return MultiSelectDefaultRenderer({ type, value });
    case "category":
      return CategoryDefaultRenderer({ type, value });
    case "check":
      return CheckDefaultRenderer({ type, value });
    case "num_range":
      return NumberRangeDefaultRenderer({ type, value });
    case "data_range":
      return DataRangeDefaultRenderer({ type, value });
    default:
      return null;
  }
}
