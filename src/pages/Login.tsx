import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import LoginContainer from "../components/LoginContainer";

export function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <LoginContainer>
      <h5 className="select-none hover:cursor-pointer text-[#8a8886] mb-5">
        ← Back to Home
      </h5>
      <div className="text-center text-3xl font-medium my-10 text-[#4d3c2d]">
        Member Login
      </div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          size="lg"
          label="Email"
          placeholder="Enter your email"
          key={form.key("email")}
          labelProps={{ className: "text-[#8e735b]" }}
          className="mb-8"
          inputSize="35"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          size="lg"
          label="Password"
          placeholder="Enter your password"
          labelProps={{ className: "text-[#8e735b]" }}
          inputSize="35"
          className="mb-10"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Button type="submit" fullWidth color="#8e735b" h={50} className="mb-8">
          Sign In
        </Button>
        <div className="text-[#4d3c2d] text-center mb-2">
          No Account ?{" "}
          <a href="" className="text-[#8e735b]">
            Register Now
          </a>
        </div>
      </form>
    </LoginContainer>
  );
}
