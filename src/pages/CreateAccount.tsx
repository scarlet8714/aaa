import { Button, FileInput, PasswordInput, TextInput } from "@mantine/core";
import LoginContainer from "../components/LoginContainer";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";

export default function CreateAccount() {
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
      <Link
        to="/"
        className="select-none hover:cursor-pointer text-[#8a8886] mb-4"
      >
        ← Back to Home
      </Link>
      <div className="text-center text-3xl font-medium my-6 text-[#4d3c2d]">
        Create Account
      </div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          size="md"
          label="Username"
          placeholder="Set your display name"
          key={form.key("username")}
          labelProps={{ className: "text-[#8e735b]" }}
          className="mb-4"
          inputSize="35"
          {...form.getInputProps("username")}
        />
        <TextInput
          size="md"
          label="Email Address"
          placeholder="Enter your email"
          key={form.key("email")}
          labelProps={{ className: "text-[#8e735b]" }}
          className="mb-4"
          inputSize="35"
          {...form.getInputProps("email")}
        />
        <div className="flex w-full flex-auto gap-5 mb-4">
          <PasswordInput
            size="md"
            label="Set password"
            labelProps={{ className: "text-[#8e735b]" }}
            className="basis-1/2"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <PasswordInput
            size="md"
            label="Confirm password"
            labelProps={{ className: "text-[#8e735b]" }}
            className="basis-1/2"
            key={form.key("cpassword")}
            {...form.getInputProps("cpassword")}
          />
        </div>
        <FileInput
          size="md"
          className="mb-8"
          labelProps={{ className: "text-[#8e735b]" }}
          label="Upload Avatar"
          description="Supported: JPG JPEG PNG GIF"
          placeholder="No File Chosen (This is optional)"
        />
        <Button type="submit" fullWidth color="#8e735b" h={50} className="mb-4">
          Sign Up
        </Button>
        <div className="text-[#4d3c2d] text-center mb-2">
          Have an account ?{" "}
          <a href="" className="text-[#8e735b]">
            Login Here
          </a>
        </div>
      </form>
    </LoginContainer>
  );
}
