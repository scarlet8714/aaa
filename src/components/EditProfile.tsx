import { Button, FileInput, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

interface registerForm {
  username: string;
  email: string;
  profile_pic: File | null;
}

export default function EditProfile({
  setUser,
}: {
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      role: string;
      profile_pic: string;
    }>
  >;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  //   const [errMsg, setErrMsg] = useState("");
  //   const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      email: "",
      profile_pic: null,
    },

    validate: {
      email: (value: string) => {
        if (value === "") {
          return null;
        } else if (!/^\S+@\S+.com\S*$/.test(value)) {
          return "Invalid email";
        } else {
          return null;
        }
      },
    },
  });
  const handleUpdateProfile = async (values: registerForm) => {
    console.log(values);
    const formData = new FormData();
    formData.append("username", values.username); // 你的 state
    formData.append("email", values.email);

    // 如果使用者有選檔案才 append
    if (values.profile_pic) {
      formData.append("profile_pic", values.profile_pic);
    }

    try {
      const response = await fetch("/hw3_614410164/backend/edit_profile.php", {
        method: "POST",
        body: formData, // 直接丟 FormData，不要加 Content-Type header，瀏覽器會自動處理
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);
      //   if (result.success) {
      //     console.log("更新成功！大頭照路徑：", result.new_data.profile_pic);
      //   }
      setUser((prevState) => {
        return {
          username: result.new_data.username,
          email: result.new_data.email,
          role: prevState.role,
          profile_pic: result.new_data.profile_pic,
        };
      });
      close();
    } catch (err) {
      console.error("上傳失敗", err);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Profile"
        classNames={{ title: "text-bold text-2xl" }}
      >
        <form
          onSubmit={form.onSubmit((values: registerForm) =>
            handleUpdateProfile(values),
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
          <FileInput
            size="md"
            className="mb-8"
            labelProps={{ className: "text-[#8e735b]" }}
            label="Upload Avatar"
            description="Supported: JPG JPEG PNG GIF"
            placeholder="No File Chosen (This is optional)"
            accept="image/png,image/jpeg,image/jpg,image/gif"
            {...form.getInputProps("profile_pic")}
          />
          {/* <span className="text-red-500">{errMsg}&nbsp;</span> */}
          <div className="flex gap-5">
            <Button
              type="submit"
              fullWidth
              color="#8e735b"
              h={40}
              className="mb-4"
              //   loading={isLoading}
            >
              Save
            </Button>
            <Button
              type="submit"
              fullWidth
              color="#8e735b"
              h={40}
              className="mb-4"
              //   loading={isLoading}
              onClick={close}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Button variant="filled" color="#4d3c2d" onClick={open}>
        Edit Profile
      </Button>
    </>
  );
}
