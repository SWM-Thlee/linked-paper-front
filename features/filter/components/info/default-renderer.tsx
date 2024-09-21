import Button from "@/ui/button";
import CheckBox from "@/ui/check-box";
import { Filter } from "../../types";

export function SelectDefaultRenderer({ value }: Filter.Attribute.Select) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value?.itemID ?? "Unknown"}
    </Button>
  );
}

export function MultiSelectDefaultRenderer({
  value,
}: Filter.Attribute.MultiSelect) {
  return Object.values(value ?? {}).map((content) => (
    <Button ui_variant="bordered" ui_size="small" key={content.itemID}>
      {content.itemID}
    </Button>
  ));
}

export function FieldDefaultRenderer({ value }: Filter.Attribute.Field) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value ?? "Unknown"}
    </Button>
  );
}

export function CheckDefaultRenderer({ value }: Filter.Attribute.Check) {
  return <CheckBox defaultChecked={value} disabled ui_variant="bordered" />;
}

export function NumberRangeDefaultRenderer({
  value,
}: Filter.Attribute.NumberRange) {
  return (
    <Button ui_variant="bordered" ui_size="small">
      {value?.min ?? "-∞"} ~ {value?.max ?? "∞"}
    </Button>
  );
}

export function DataRangeDefaultRenderer({
  value,
}: Filter.Attribute.DataRange) {
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
}: Filter.Attribute.Type) {
  switch (type) {
    case Filter.Attribute.Select:
      return SelectDefaultRenderer({ type, value });
    case Filter.Attribute.MultiSelect:
      return MultiSelectDefaultRenderer({ type, value });
    case Filter.Attribute.Field:
      return FieldDefaultRenderer({ type, value });
    case Filter.Attribute.Check:
      return CheckDefaultRenderer({ type, value });
    case Filter.Attribute.NumberRange:
      return NumberRangeDefaultRenderer({ type, value });
    case Filter.Attribute.DataRange:
      return DataRangeDefaultRenderer({ type, value });
    default:
      return null;
  }
}
