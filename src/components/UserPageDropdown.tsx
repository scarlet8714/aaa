import { Button, Menu } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

export default function UserPageDropdown() {
  const navigate = useNavigate();
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
          <span className="text-[#4d3c2d]"> 🧟‍♂️ User Page</span>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item color="gray" onClick={() => navigate("/userinfo")}>
          帳戶資訊
        </Menu.Item>
        <Menu.Item color="gray">我的預約</Menu.Item>
        <Menu.Item color="gray">
          <Link to={"/changepassword"}>修改密碼</Link>
        </Menu.Item>
        <Menu.Item color="#4d3c2d">刪除帳號</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
