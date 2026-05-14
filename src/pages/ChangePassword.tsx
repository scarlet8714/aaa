import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function ChangePassword() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      oldpassword: "",
      newpassword: "",
      cpassword: "",
    },

    validate: {
      oldpassword: (value) => {
        if (value === "") {
          return "Required field cannot be empty";
        } else if (!/^[a-zA-Z0-9]{8,}$/.test(value)) {
          return "Invalid password";
        } else {
          return null;
        }
      },
      newpassword: (value) => {
        if (value === "") {
          return "Required field cannot be empty";
        } else if (!/^[a-zA-Z0-9]{8,}$/.test(value)) {
          return "Invalid password";
        } else {
          return null;
        }
      },
      cpassword: (value) => {
        if (value === "") {
          return "Required field cannot be empty";
        } else if (!/^[a-zA-Z0-9]{8,}$/.test(value)) {
          return "Invalid password";
        } else {
          return null;
        }
      },
    },
  });
  return (
    <div>
      <form
      //   onSubmit={form.onSubmit((values: registerForm) =>
      //     handleUpdateProfile(values),
      //   )}
      >
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
        {/* <span className="text-red-500">{errMsg}&nbsp;</span> */}

        <Button
          type="submit"
          fullWidth
          color="#8e735b"
          h={40}
          className="mb-4"
          //   loading={isLoading}
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}
