import React from "react";
import { TbChevronDown, TbSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import {
  ActionIcon,
  Group,
  Header,
  Menu,
  TextInput,
  TextInputProps,
} from "@mantine/core";

import { useAuth } from "../auth/auth";

function MyHeader({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: (search: string) => void;
}) {
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <Header
      height={56}
      className="px-4 bg-slate-700 text-inherit border-b-slate-900 border-b-2"
    >
      <div className="h-14 flex justify-between items-center">
        <DebouncedInput
          value={searchValue}
          onChange={(_searchValue) => setSearchValue(_searchValue.toString())}
          classNames={{
            input: "bg-slate-800 border-none text-slate-100",
            root: "flex-1",
          }}
          icon={<TbSearch size={16} />}
          placeholder="Search Vault"
        />

        <Group className="w-64 justify-end">
          <p className="align-middle">{auth.user} </p>
          <Menu>
            <Menu.Target>
              <ActionIcon className="text-slate-100">
                <TbChevronDown size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component="button"
                onClick={() => {
                  auth.signout(() => navigate("/"));
                }}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </Header>
  );
}

export default MyHeader;

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<TextInputProps, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <TextInput
      className="flex-1"
      {...props}
      size="xs"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      aria-label="search"
      variant="unstyled"
    />
  );
}
