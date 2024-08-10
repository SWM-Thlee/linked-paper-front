import { ReactNode } from "react";
import { extendVariants, Tabs as _Tabs, TabItemProps } from "@nextui-org/react";
import { IconType } from "react-icons";

export type TabProps = {
  tabName: string;
  tabIcon?: IconType;
} & TabItemProps;

// Tab Content에 Icon을 추가합니다.
function IconTitle({
  icon: Icon,
  title,
}: {
  icon: IconType;
  title?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} />
      <span>{title}</span>
    </div>
  );
}

// Tabs 내에 존재하는 Tab의 정보를 생성합니다.
export function createTabs(elements: TabProps[]) {
  return elements.reduce<[TabItemProps[], string[]]>(
    ([items, keys], { tabIcon, tabName, ...props }) => [
      [
        ...items,
        {
          ...props,
          title: tabIcon ? (
            <IconTitle icon={tabIcon} title={props.title ?? tabName} />
          ) : (
            props.title ?? tabName
          ),
          // 특정 Tab의 Key는 Title과 동일합니다.
          key: tabName,
          textValue: props.textValue ?? tabName,
        },
      ],
      [...keys, tabName],
    ],
    [[], []],
  );
}

export const Tabs = extendVariants(_Tabs, {
  variants: {
    color: {
      primary: {
        cursor: [
          "bg-light-primary",
          // Dark Theme
          "dark:bg-dark-primary",
        ],
        tabContent: [
          "text-light-onSurface",
          "group-data-[selected=true]:text-light-onPrimary",
          // Dark Theme
          "dark:text-dark-onSurface",
          "dark:group-data-[selected=true]:text-dark-onPrimary",
        ],
        tabList: [
          "border-light-outline",
          // Dark Theme
          "dark:border-dark-outline",
        ],
      },
    },
    size: {
      md: {
        tab: ["px-4 py-1.5"],
        tabContent: ["text-label-large"],
        tabList: ["border-1", "p-1"],
      },
    },
  },
  // 기본 설정
  defaultVariants: {
    variant: "bordered",
    color: "primary",
    size: "md",
    radius: "full",
  },
});
