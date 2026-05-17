import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import LoginContainer from "../components/LoginContainer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const loginFunc = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      // 1. 準備資料
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      // 2. 發送請求
      const response = await fetch("/hw3_614410164/backend/login.php", {
        method: "POST",
        body: formData,
        // 關鍵：這行沒加的話，後端 session_start() 每次都會給你新的 ID，導致登入無效
        credentials: "include",
      });

      // 3. 解析 JSON 回應
      const result = await response.json();

      if (response.ok && result.success) {
        console.log("登入成功！", result.user);
        alert("歡迎回來：" + result.user.username);

        // 可以選擇把資料存在 localStorage 方便前端顯示，但認證還是要靠 Session
        localStorage.setItem("user_info", JSON.stringify(result.user));
        navigate("/");
        // 跳轉頁面
      } else {
        // 這裡會抓到你 PHP throw new Exception 的內容
        setErrMsg("登入失敗：" + (result.error || "未知錯誤"));
      }
    } catch (error) {
      console.error("網路錯誤或後端當機：", error);
    }
  };
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+.com\S*$/.test(value) ? null : "Invalid email",
      password: (value) =>
        /^[a-zA-Z0-9]{8,}$/.test(value) ? null : "Invalid password",
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
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          loginFunc(values);
        })}
      >
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
        <span className="text-red-500">{errMsg}</span>
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
