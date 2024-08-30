"use client";

import { useMemo } from "react";
import {
  description,
  group,
  representative,
} from "@/features/search/utils/group";
import { PaperMetadata } from "@/types/paper";

import Button from "@/ui/button";
import Popover from "@/ui/popover";
import FieldIcon from "@/ui/icons/field";

type Props = Pick<PaperMetadata, "fields">;

function Fields({ fields }: Props) {
  // 각 하위 분류에 대한 상세 설명
  const descriptions = useMemo(
    () =>
      fields.reduce<{ [field: string]: string }>(
        (result, field) => ({ ...result, [field]: description(field) }),
        {},
      ),
    [fields],
  );

  return (
    <div className="grid gap-2">
      {fields.map((field) => (
        <div
          key={field}
          className="flex items-center justify-between gap-12 rounded-full bg-light-secondaryContainer px-4 py-1.5 text-light-onSecondaryContainer dark:bg-dark-secondaryContainer dark:text-dark-onSecondaryContainer"
        >
          <div className="text-nowrap text-title-medium">
            {descriptions[field]}
          </div>
          <div className="text-nowrap text-label-large">{field}</div>
        </div>
      ))}
    </div>
  );
}

// 해당 논문의 하위 분류를 표시하는 버튼 컴포넌트입니다.
export default function SearchResultAttributeFields({ fields }: Props) {
  // 상위 분류를 기준으로 그룹화
  const fieldGroup = useMemo(() => group(fields), [fields]);

  // 특정 규칙에 따라 간략화된 분류
  const title = useMemo(() => representative(fieldGroup), [fieldGroup]);

  // 하위 분류의 개수
  const amount = useMemo(
    () =>
      fields.length
        ? fields.length > 1
          ? `${fields.length} Fields`
          : "Field"
        : "Fields Unclassified",
    [fields.length],
  );

  return (
    <Popover
      trigger={
        <Button
          _color="secondary"
          _variant="light"
          className="flex items-center gap-4"
        >
          <FieldIcon _size="small" /> {title}
        </Button>
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div className="text-title-large">{amount}</div>
        </div>
        <div className="flex max-h-[25vh] flex-col gap-6 overflow-y-auto scrollbar">
          {!!fields.length &&
            Object.entries(fieldGroup).map(([groupName, fieldIds]) => (
              <div key={groupName} className="flex flex-col gap-2">
                <div className="text-body-large">{groupName}</div>
                <Fields fields={fieldIds} />
              </div>
            ))}
        </div>
      </div>
    </Popover>
  );
}
