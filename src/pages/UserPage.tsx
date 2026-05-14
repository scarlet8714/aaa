import { Button } from "@mantine/core";
import { useEffect } from "react";
const fetchMyPrivateData = async () => {
  const response = await fetch(
    "http://wwweb2026.csie.io:51010/hw3_614410164/backend/get_userinfo.php",
    {
      method: "GET",
      credentials: "include", // 必帶！否則後端 $_SESSION 是空的
    },
  );

  const result = await response.json();
  console.log(result);
  if (result.success) {
    console.log("拿到秘密資料了：", result.private_data);
  } else {
    console.error("失敗：", result.error);
  }
};

export default function UserPage() {
  useEffect(() => {
    fetchMyPrivateData();
  }, []);
  return (
    <div className="px-80 py-20">
      <div className="flex justify-between">
        <span className="text-[#8e735b] text-4xl">Account Info</span>
        <Button variant="filled" color="#8e735b">
          Edit Profile
        </Button>
      </div>
      <div className="flex gap-5 mt-20">
        <div className="flex-1/3 w-full aspect-square overflow-hidden">
          <img
            className="w-full h-full object-center object-cover"
            src="http://wwweb2026.csie.io:51010/uploads/avatar_6a0416da59da5.png"
            alt=""
          />
        </div>
        <div className="flex-2/3 flex flex-col text-2xl justify-between text-gray-400">
          <div>
            {`Name:`}
            <span></span>
          </div>
          <div>
            {`Email(Account):`}
            <span></span>
          </div>
          <div>
            {`Role:`}
            <span></span>
          </div>
          <div>
            View your account information here. Click "Edit Profile" to update
            name/email/avatar.
          </div>
        </div>
      </div>
    </div>
  );
}
