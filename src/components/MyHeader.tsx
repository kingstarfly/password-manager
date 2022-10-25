import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TbSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

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

  search: {
    [theme.fn.smallerThan("xs")]: {
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
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <TextInput
          className={classes.search}
          icon={<TbSearch size={16} />}
          placeholder="Search Vault"
        />

        <Group>
          <p>
            {auth.user}{" "}
            <button
              onClick={() => {
                auth.signout(() => navigate("/"));
              }}
            >
              Sign out
            </button>
          </p>
        </Group>
      </div>
    </Header>
  );
}

export default MyHeader;
