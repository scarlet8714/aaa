import { Button, Checkbox } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    // 1. 安全防護：再次向使用者確認意願
    const doubleCheck = window.confirm(
      "警告：註銷帳號是不可逆的操作！您所有未來的預約將會被取消，確定要刪除帳號嗎？",
    );

    if (!doubleCheck) return;

    try {
      const response = await fetch(
        "/hw3_614410164/backend/delete_account.php",
        {
          method: "POST",
          credentials: "include", // 帶上 Session Cookie
        },
      );

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        // 2. 登銷成功後，將前端的導向至首頁或登入頁，並清空前端的 User State
        localStorage.removeItem("user_info");
        navigate("/");
        navigate(0);
      } else {
        alert("操作失敗：" + result.message);
      }
    } catch (error) {
      console.error("刪除帳號請求失敗:", error);
      alert("網路連線異常");
    }
  };
  return (
    <div className="mx-60 my-30 flex flex-col gap-5">
      <div className="text-2xl text-amber-950">DeleteAccount</div>
      <div className="text-md">This action can't be undone</div>
      <Checkbox
        label="I understand and want to delete my account"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      <Button
        color="red"
        variant="filled"
        disabled={!checked}
        onClick={() => handleDeleteAccount()}
        w={300}
      >
        Delete
      </Button>
    </div>
  );
}
