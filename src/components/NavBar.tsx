import { Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserPageDropdown from "./UserPageDropdown";

export default function NavBar() {
  const [role, setRole] = useState(() => {
    const userInfo = localStorage.getItem("user_info");
    let userInfoObj;
    if (userInfo) {
      userInfoObj = JSON.parse(userInfo);
    }
    if (userInfoObj) {
      if (userInfoObj.role === "admin") {
        return "admin";
      } else if (userInfoObj.role === "user") {
        return "user";
      }
    } else {
      return "";
    }
  });
  useEffect(() => {
    const handleStorageChange = () => {
      const currentRole = localStorage.getItem("userinfo") || "";
      setRole(currentRole);
    };

    // 監聽來自其他標籤頁的 localStorage 變動
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const handleLogout = async () => {
    try {
      const response = await fetch("/hw3_614410164/backend/logout.php", {
        method: "POST", // 或者 GET，看你後端怎麼寫
        credentials: "include", // 關鍵：要把 Cookie 帶過去，後端才知道要刪除哪個 Session
      });

      const result = await response.json();

      if (result.success) {
        // 1. 清除前端所有的使用者快取
        localStorage.removeItem("user_info");
        // 如果你有存 token 或其他東西也一併清除
        // localStorage.clear();

        alert("您已登出");
        setRole("");
        // 2. 跳轉回登入頁面或首頁
        // window.location.href = 'login.html';
      }
    } catch (error) {
      console.error("登出失敗：", error);
    }
  };
  return (
    <div className="h-18 bg-[#fdfdfd] w-full shadow-lg px-20 flex items-center justify-between">
      <div className="flex">
        <div className=" w-12 h-12 rounded-xl bg-linear-to-br from-[#a28470] to-[#c8a38c] p-1 mr-5">
          <div className=" w-5 h-5 rounded-full bg-radial from-white to-transparent"></div>
        </div>
        <div>
          <Text className="text-[#4d3c2d]" size="xl" fw={600}>
            Campus Reservation
          </Text>
          <Text size="sm" className="text-[#9f9b98]">
            Campus Equipment/Space Reservation
          </Text>
        </div>
      </div>
      <div className="flex gap-5 ">
        <Button
          color="#dcdcd7"
          radius={50}
          variant="outline"
          classNames={{ root: "navbtn" }}
        >
          <span className="text-[#4d3c2d]">🏠 Home</span>
        </Button>
        {role === "admin" ? <UserPageDropdown /> : <UserPageDropdown />}
      </div>
      {role === "" ? (
        <Button
          variant="gradient"
          gradient={{ from: "#a0876d", to: "#d8ccbc", deg: 90 }}
          w={200}
        >
          <Link to={"/login"}>Login / Register</Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          color="#4d3c2d"
          w={200}
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </div>
  );
}
