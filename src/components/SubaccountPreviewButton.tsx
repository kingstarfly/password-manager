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
  const { name, email } = subaccountPreview;
  return (
    <UnstyledButton
      className="flex items-stretch justify-start flex-1 hover:bg-slate-500"
      onClick={onSelect}
    >
      <div className={clsx("w-2 py-4", selected && "bg-blue-300")} />
      <div className="flex flex-col items-center justify-center py-4 pl-6">
        <p className="text-slate-100 text-md">{name}</p>
        <p className="text-sm text-slate-400">{email}</p>
      </div>
    </UnstyledButton>
  );
};
export default SubaccountPreviewButton;
