import { ActionIcon, Button, PasswordInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { TbCopy, TbTrash } from "react-icons/tb";

export interface SubaccountProps {
  id: number;
  name: string;
  username: string;
  password: string;
}

const SubaccountView = ({
  subaccountId,
}: {
  subaccountId: number | undefined;
}) => {
  const {
    data: subaccount,
    isLoading,
    error,
  } = useQuery(["subaccount", subaccountId], () =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${subaccountId}`).then(
      (res) => ({
        id: subaccountId,
        name: "Subaccount " + subaccountId,
        username: "user@example.com",
        password: "thePassword",
      })
    )
  );
  if (subaccountId === undefined) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start h-full p-8">
      <div className="w-[500px] h-fit flex flex-col">
        <h2 className="text-md mb-2 font-medium uppercase text-slate-400">
          Account Information
        </h2>
        <div className="bg-slate-700 p-4 flex flex-col gap-6">
          <div>
            <p className="text-slate-400 text-base">Name</p>
            <p className="text-slate-100 text-lg font-medium">
              {subaccount?.name}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-base">Username</p>
            <p className="text-slate-100 text-lg font-medium">
              {subaccount?.username}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-base">Password</p>
            <div className="flex flex-row items-center">
              <PasswordInput
                variant="unstyled"
                value={subaccount?.password}
                contentEditable={false}
                classNames={{
                  root: "flex-1",
                  input: "pointer-events-none",
                  innerInput: "p-0 text-slate-100 text-lg font-medium",
                }}
              />
              <ActionIcon
                onClick={() => {
                  showNotification({
                    message: "Copied to clipboard!",
                    autoClose: 2000,
                  });
                }}
              >
                <TbCopy size={16} />
              </ActionIcon>
            </div>
          </div>
        </div>

        <Button
          // TODO: Delete subaccount
          onClick={() => {}}
          leftIcon={<TbTrash size={16} />}
          className="self-center mt-4 px-6 py-3 text-red-500 bg-slate-700 hover:bg-slate-600"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SubaccountView;
