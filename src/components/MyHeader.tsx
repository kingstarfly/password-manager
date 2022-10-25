import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  TextInput,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TbChevronDown, TbSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

function MyHeader() {
  const { classes } = useStyles();
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <Header
      height={56}
      className="px-4 bg-slate-700 text-inherit border-b-slate-900 border-b-2"
    >
      <div className="h-14 flex justify-between items-center">
        <TextInput
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
