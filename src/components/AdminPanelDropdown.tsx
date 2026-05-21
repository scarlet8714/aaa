import { Button, Menu } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

export default function AdminPanelDropdown() {
  const navigate = useNavigate();
  // const handleDeleteAccount = async () => {
  //   // 1. 安全防護：再次向使用者確認意願
  //   const doubleCheck = window.confirm(
  //     "警告：註銷帳號是不可逆的操作！您所有未來的預約將會被取消，確定要刪除帳號嗎？",
  //   );

  //   if (!doubleCheck) return;

  //   try {
  //     const response = await fetch(
  //       "/hw3_614410164/backend/delete_account.php",
  //       {
  //         method: "POST",
  //         credentials: "include", // 帶上 Session Cookie
  //       },
  //     );

  //     const result = await response.json();

  //     if (result.success) {
  //       alert(result.message);
  //       // 2. 登銷成功後，將前端的導向至首頁或登入頁，並清空前端的 User State
  //       localStorage.removeItem("user_info");
  //       navigate("/");
  //       navigate(0);
  //     } else {
  //       alert("操作失敗：" + result.message);
  //     }
  //   } catch (error) {
  //     console.error("刪除帳號請求失敗:", error);
  //     alert("網路連線異常");
  //   }
  // };
  return (
    <Menu
      width={200}
      position="bottom-start"
      trigger="hover"
      openDelay={100}
      closeDelay={100}
      classNames={{ item: "text-gray-500" }}
    >
      <Menu.Target>
        <Button
          color="#dcdcd7"
          radius={50}
          variant="outline"
          classNames={{ root: "navbtn" }}
          onClick={() => navigate("/userinfo")}
        >
          <span className="text-[#4d3c2d]"> ⚙️ Admin Panel</span>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item color="gray" onClick={() => navigate("/userinfo")}>
          帳戶資訊
        </Menu.Item>
        <Menu.Item color="gray">
          <Link to={"/allbookings"}>所有預約</Link>
        </Menu.Item>
        <Menu.Item color="gray">
          <Link to={"/allresources"}>所有資源</Link>
        </Menu.Item>
        <Menu.Item color="gray">
          <Link to={"/changepassword"}>修改密碼</Link>
        </Menu.Item>
        <Menu.Item
          color="#4d3c2d"
          // onClick={() => {
          //   handleDeleteAccount();
          // }}
          onClick={() => navigate("/deleteaccount")}
        >
          刪除帳號
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
