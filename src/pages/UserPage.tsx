import { useEffect, useState } from "react";
import EditProfile from "../components/EditProfile";
const fetchMyPrivateData = async (
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      role: string;
      profile_pic: string;
    }>
  >,
) => {
  const response = await fetch("/hw3_614410164/backend/get_userinfo.php", {
    method: "GET",
    credentials: "include", // 必帶！否則後端 $_SESSION 是空的
  });

  const result = await response.json();
  console.log(result);
  if (result.success) {
    console.log("拿到秘密資料了：", result.private_data);
    setUser({
      username: result.private_data.username,
      email: result.private_data.email,
      role: result.private_data.role,
      profile_pic: result.private_data.profile_pic,
    });
  } else {
    console.error("失敗：", result.error);
  }
};

export default function UserPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    profile_pic: "",
  });
  useEffect(() => {
    fetchMyPrivateData(setUser);
  }, []);
  return (
    <div className="px-80 py-20 box-md">
      <div className="flex justify-between">
        <span className="text-[#8e735b] text-4xl">Account Info</span>
        <EditProfile setUser={setUser} />
      </div>
      <div className="flex gap-5 mt-20">
        <div className="flex-1/3 w-full aspect-square overflow-hidden">
          <img
            className="w-full h-full object-center object-cover"
            src={
              user.profile_pic === ""
                ? "http://wwweb2026.csie.io:51010/uploads/default.png"
                : user.profile_pic
            }
          />
        </div>
        <div className="flex-2/3 flex flex-col text-2xl justify-between text-gray-400">
          <div>
            {`Name: `}
            <span className="text-[#be9b84] font-bold">{user.username}</span>
          </div>
          <div>
            {`Email(Account): `}
            <span className="text-[#be9b84] font-bold">{user.email}</span>
          </div>
          <div>
            {`Role: `}
            <span className="text-[#be9b84] font-bold">{user.role}</span>
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
