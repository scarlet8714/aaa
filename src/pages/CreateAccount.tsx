import { Button, FileInput, PasswordInput, TextInput } from "@mantine/core";
import LoginContainer from "../components/LoginContainer";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface registerForm {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  avatar: File | null;
}

export default function CreateAccount() {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register(values: registerForm) {
    setIsLoading(true);
    setErrMsg("");
    if (values.password !== values.cpassword) {
      setErrMsg("Password do not match");
      setIsLoading(false);
      return;
    }
    const formData = new FormData();

    // 2. 將文字資料塞入 (對應 PHP 的 $_POST['key'])
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("cpassword", values.cpassword);

    // 3. 將檔案塞入 (對應 PHP 的 $_FILES['avatar'])
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }

    try {
      // 4. 發送請求
      const response = await fetch(
        "http://wwweb2026.csie.io:51010/hw3_614410164/backend/register.php",
        {
          method: "POST",
          // 注意：使用 FormData 時，絕對「不要」手動設定 Content-Type header
          // 瀏覽器會自動幫你加上 multipart/form-data 並包含正確的 boundary
          body: formData,
        },
      );

      // 5. 處理後端丟出的錯誤 (http_response_code 400)
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        // 這裡會跳到下方的 catch
        throw new Error(errorData.error || "註冊失敗");
      }

      // 6. 成功後的邏輯
      const result = await response.json();
      alert("註冊成功！");
      console.log(result);
      navigate("/login");
      // 例如：window.location.href = '/login';
    } catch (err: any) {
      // 這裡會捕捉到 PHP throw 出來的 Exception 訊息
      const error = err as Error;
      setErrMsg(error.message);
      // console.error("Catch Error:", err);
      // alert("錯誤：" + err);
    } finally {
      setIsLoading(false);
    }
  }
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      avatar: null,
    },

    validate: {
      username: (value) =>
        value === "" ? "Required field cannot be empty" : null,
      email: (value: string) => {
        if (value === "") {
          return "Required field cannot be empty";
        } else if (!/^\S+@\S+.com\S*$/.test(value)) {
          return "Invalid email";
        } else {
          return null;
        }
      },
      password: (value) => {
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
      <form
        onSubmit={form.onSubmit((values: registerForm) => register(values))}
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
          accept="image/png,image/jpeg,image/jpg,image/gif"
          {...form.getInputProps("avatar")}
        />
        <span className="text-red-500">{errMsg}&nbsp;</span>
        <Button
          type="submit"
          fullWidth
          color="#8e735b"
          h={50}
          className="mb-4"
          loading={isLoading}
        >
          Sign Up
        </Button>
        <div className="text-[#4d3c2d] text-center mb-2">
          Have an account ?{" "}
          <Link to="/login" className="text-[#8e735b]">
            Login Here
          </Link>
        </div>
      </form>
    </LoginContainer>
  );
}
