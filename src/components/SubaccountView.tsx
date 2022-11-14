import React from "react";
import {
  ActionIcon,
  Button,
  Loader,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TbCheck, TbCopy, TbTrash } from "react-icons/tb";
import { BASE_URL } from "../api/constants";
import Cookies from "js-cookie";
export interface SubaccountProps {
  id: number;
  name: string;
  username: string;
  password: string;
}

interface DecryptedData {
  id: string;
  name: string;
  plainUsername: string;
  plainPassword: string;
}

const SubaccountView = ({
  mode,
  subaccountId,
  onCreateCallback,
}: {
  mode: "view" | "add";
  subaccountId: number | undefined;
  onCreateCallback: () => void;
}) => {
  const {
    data: subaccount,
    isInitialLoading,
    error,
  } = useQuery<DecryptedData>(
    ["subaccount", subaccountId],
    () =>
      fetch(`${BASE_URL}/accounts/subaccount?id=${subaccountId}`, {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          "X-CSRF-TOKEN": Cookies.get("csrf_access_token") || "",
        }),
      }).then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            return data;
          });
        } else {
          return null;
        }
      }),
    {
      enabled: mode === "view" && subaccountId !== undefined,
    }
  );

  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const queryClient = useQueryClient();

  const createSubaccountMutation = useMutation({
    mutationFn: () => {
      return fetch(`${BASE_URL}/accounts/subaccount`, {
        method: "POST",
        body: new URLSearchParams({
          name: name,
          username: username,
          password: password,
        }),
        credentials: "include",
        headers: new Headers({
          csrf_access_token: Cookies.get("csrf_access_token") || "",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          showNotification({
            message: `Subaccount of name ${data.name} created!`,
          });
          setName("");
          setUsername("");
          setPassword("");
          onCreateCallback();
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subaccounts"], exact: true });
    },
  });

  if (mode === "view" && subaccountId === undefined) {
    return null;
  }

  if (isInitialLoading) {
    return (
      <div className="flex flex-col items-center justify-start h-full p-8">
        <Loader />
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="flex flex-col items-center justify-start h-full p-8">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start h-full p-8">
      <div className="w-[500px] h-fit flex flex-col">
        <h2 className="text-md mb-2 font-medium uppercase text-slate-400">
          {mode === "view" ? "Account Information" : "Add Account"}
        </h2>
        <div className="bg-slate-700 p-4 flex flex-col gap-6">
          <div>
            <p className="text-slate-400 text-base">Name</p>
            {mode === "view" ? (
              <p className="text-slate-100 text-lg font-medium">
                {subaccount?.name}
              </p>
            ) : (
              <TextInput
                onChange={(event) => setName(event.currentTarget.value)}
                value={name}
                classNames={{
                  root: "p-0",
                  wrapper: "p-0",
                  input: "text-slate-100 text-lg font-medium p-0",
                }}
                variant="unstyled"
              />
            )}
          </div>

          <div>
            <p className="text-slate-400 text-base">Username</p>
            {mode === "view" ? (
              <p className="text-slate-100 text-lg font-medium">
                {subaccount?.plainUsername}
              </p>
            ) : (
              <TextInput
                onChange={(event) => setUsername(event.currentTarget.value)}
                value={username}
                classNames={{
                  input: "text-slate-100 text-lg font-medium",
                }}
                variant="unstyled"
              />
            )}
          </div>

          <div>
            <p className="text-slate-400 text-base">Password</p>
            <div className="flex flex-row items-center">
              <PasswordInput
                variant="unstyled"
                value={mode === "view" ? subaccount?.plainPassword : password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                contentEditable={mode === "add"}
                classNames={{
                  root: "flex-1",
                  input: mode === "view" ? "pointer-events-none" : "",
                  innerInput: "p-0 text-slate-100 text-lg font-medium",
                }}
              />
              {mode === "view" ? (
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
              ) : null}
            </div>
          </div>
        </div>

        {mode === "view" ? (
          <Button
            // TODO: Delete subaccount
            onClick={() => {}}
            leftIcon={<TbTrash size={16} />}
            className="self-center mt-4 px-6 py-3 text-red-500 bg-slate-700 hover:bg-slate-600"
          >
            Delete
          </Button>
        ) : (
          <Button
            onClick={() => {
              createSubaccountMutation.mutate();
            }}
            loading={createSubaccountMutation.isLoading}
            leftIcon={<TbCheck size={16} />}
            className="self-center mt-4 px-6 py-3 text-blue-400 bg-slate-700 hover:bg-slate-600"
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubaccountView;
