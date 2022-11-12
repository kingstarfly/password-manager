import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm, UseFormReturnType } from "@mantine/form";
import {
  Anchor,
  Button,
  Center,
  Group,
  Paper,
  PasswordInput,
  PasswordInputProps,
  Stack,
  TextInput,
  TextInputProps,
} from "@mantine/core";

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  return (
    <Center className="h-screen bg-slate-800">
      <div className="text-slate-100">
        <h3 className="text-2xl pb-4">
          {type === "login"
            ? "Verify your identity to unlock your vault"
            : "Create an account to get started"}
        </h3>

        <form
          onSubmit={form.onSubmit(({ email, password }) => {
            if (type === "login") {
              auth.signin(email, password, () => {
                // Send them back to the page they tried to visit when they were
                // redirected to the login page. Use { replace: true } so we don't create
                // another entry in the history stack for the login page.  This means that
                // when they get to the protected page and click the back button, they
                // won't end up back on the login page, which is also really nice for the
                // user experience.
                navigate(from, { replace: true });
              });
            } else {
              auth.register(email, password, () => {
                navigate(from, { replace: true });
              });
            }
            
          })}
        >
          <Stack className="px-[12%]">
            <MyTextInput
              label="Email"
              labelProps={{
                className: "text-slate-100",
              }}
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />

            <MyPasswordInput
              label="Password"
              labelProps={{
                className: "text-slate-100",
              }}
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
            />
          </Stack>

          <Stack mt="xl" className="items-center">
            <Button
              variant="default"
              className="bg-slate-600 text-blue-300 border-none w-fit px-8"
              type="submit"
            >
              {upperFirst(type)}
            </Button>
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login here"
                : "Don't have an account? Register here"}
            </Anchor>
          </Stack>
        </form>
      </div>
    </Center>
  );
}
export default LoginPage;

const MyTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      variant="unstyled"
      classNames={{
        root: "bg-slate-600 px-4 py-2 rounded-sm",
        label: "text-slate-400",
        input: "text-slate-100 p-0 m-0",
      }}
    />
  );
};

const MyPasswordInput = (props: PasswordInputProps) => {
  return (
    <PasswordInput
      {...props}
      variant="unstyled"
      classNames={{
        root: "bg-slate-600 px-4 py-2 rounded-sm",
        label: "text-slate-400",
        innerInput: "text-slate-100 p-0 m-0",
      }}
    />
  );
};
