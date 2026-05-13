import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import LoginContainer from "../components/LoginContainer";
import { Link } from "react-router-dom";

export function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <LoginContainer>
      <Link
        to="/"
        className="select-none hover:cursor-pointer text-[#8a8886] mb-4"
      >
        ← Back to Home
      </Link>
      <div className="text-center text-3xl font-medium my-6 text-[#4d3c2d]">
        Member Login
      </div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          size="md"
          label="Email"
          placeholder="Enter your email"
          key={form.key("email")}
          labelProps={{ className: "text-[#8e735b]" }}
          className="mb-4"
          inputSize="35"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          size="md"
          label="Password"
          placeholder="Enter your password"
          labelProps={{ className: "text-[#8e735b]" }}
          inputSize="35"
          className="mb-4"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Button type="submit" fullWidth color="#8e735b" h={50} className="mb-4">
          Sign In
        </Button>
        <div className="text-[#4d3c2d] text-center mb-2">
          No Account ?{" "}
          <Link to="/register" className="text-[#8e735b]">
            Register Now
          </Link>
        </div>
      </form>
    </LoginContainer>
  );
}
