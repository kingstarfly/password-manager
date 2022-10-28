import { UnstyledButton } from "@mantine/core";
import clsx from "clsx";
import { SubaccountProps } from "./SubaccountView";

export type SubaccountPreview = Omit<SubaccountProps, "password">;

const SubaccountPreviewButton = ({
  subaccountPreview,
  selected,
  onSelect,
}: {
  subaccountPreview: SubaccountPreview;
  selected: boolean;
  onSelect: () => void;
}) => {
  const { name, username } = subaccountPreview;
  return (
    <UnstyledButton
      className="flex items-stretch justify-start flex-1 hover:bg-slate-500"
      onClick={onSelect}
    >
      <div className={clsx("w-2 py-4", selected && "bg-blue-300")} />
      <div
        className={clsx(
          "flex flex-col items-start justify-center flex-1 py-4 pl-6",
          selected && "bg-slate-600"
        )}
      >
        <p className="text-slate-100 text-md">{name}</p>
        <p className="text-sm text-slate-400">{username}</p>
      </div>
    </UnstyledButton>
  );
};
export default SubaccountPreviewButton;
