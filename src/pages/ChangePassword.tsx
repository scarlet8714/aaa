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
  const handleUpdatePassword = async (
    oldPassword: string,
    newPassword: string,
  ) => {
    try {
      const response = await fetch(
        "/hw3_614410164/backend/update_password.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
          }),
          credentials: "include", // 核心關鍵，確保 Session 被帶過去
        },
      );

      const result = await response.json();

      if (result.success) {
        alert("密碼修改成功！");
        // 建議：修改成功後可以清空輸入框或導向其他頁面
      } else {
        alert("修改失敗：" + result.message);
      }
    } catch (error) {
      console.error("請求失敗:", error);
      alert("網路連線異常");
    }
  };
  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) =>
          handleUpdatePassword(values.oldpassword, values.newpassword),
        )}
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
