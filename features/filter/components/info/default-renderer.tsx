import Button from "@/ui/button";
import CheckBox from "@/ui/check-box";
import { FilterAttribute } from "../../types/attribute";

export function SelectDefaultRenderer({ value }: FilterAttribute.Select) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value?.itemID ?? "Unknown"}
    </Button>
  );
}

export function MultiSelectDefaultRenderer({
  value,
}: FilterAttribute.MultiSelect) {
  return Object.values(value ?? {}).map((content) => (
    <Button ui_variant="bordered" ui_size="small" key={content.itemID}>
      {content.itemID}
    </Button>
  ));
}

export function FieldDefaultRenderer({ value }: FilterAttribute.Field) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value ?? "Unknown"}
    </Button>
  );
}

export function CheckDefaultRenderer({ value }: FilterAttribute.Check) {
  return <CheckBox defaultChecked={value} disabled ui_variant="bordered" />;
}

export function NumberRangeDefaultRenderer({
  value,
}: FilterAttribute.NumberRange) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value?.min ?? "-∞"} ~ {value?.max ?? "∞"}
    </Button>
  );
}

export function DataRangeDefaultRenderer({ value }: FilterAttribute.DataRange) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value?.min ?? "Unknown"} ~ {value?.max ?? "Unknown"}
    </Button>
  );
}

// 각 Attribute에 대한 기본 렌더러(컴포넌트)입니다.
export function AttributeDefaultRenderer({
  type,
  value,
}: FilterAttribute.Type) {
  switch (type) {
    case FilterAttribute.Select:
      return SelectDefaultRenderer({ type, value });
    case FilterAttribute.MultiSelect:
      return MultiSelectDefaultRenderer({ type, value });
    case FilterAttribute.Field:
      return FieldDefaultRenderer({ type, value });
    case FilterAttribute.Check:
      return CheckDefaultRenderer({ type, value });
    case FilterAttribute.NumberRange:
      return NumberRangeDefaultRenderer({ type, value });
    case FilterAttribute.DataRange:
      return DataRangeDefaultRenderer({ type, value });
    default:
      return null;
  }
}
