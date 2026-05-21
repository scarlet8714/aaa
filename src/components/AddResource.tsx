import {
  Button,
  Checkbox,
  Group,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { hasLength, useForm } from "@mantine/form";
import { useRef } from "react";

export default function AddResource({ close }: { close: () => void }) {
  const timeRef1 = useRef<HTMLInputElement>(null);
  const timeRef2 = useRef<HTMLInputElement>(null);
  const form = useForm<any>({
    mode: "uncontrolled",
    initialValues: {
      resource_name: "",
      resource_type: "",
      location: "",
      day_of_week: [], // 陣列傳過去
      open_time: "", // 24小時制字串
      close_time: "",
      description: "",
      status: "",
    },
    validate: {
      resource_name: (value) =>
        value === "" ? "Required field cannot be empty" : null,
      resource_type: (value) =>
        value === "" ? "Required field cannot be empty" : null,
      location: (value) =>
        value === "" ? "Required field cannot be empty" : null,
      day_of_week: hasLength({ min: 1 }, "Select at least one day of week"),
      open_time: (value) =>
        value === "" ? "Required field cannot be empty" : null,
      close_time: (value) =>
        value === "" ? "Required field cannot be empty" : null,
      description: (value) =>
        value === "" ? "Required field cannot be empty" : null,
      status: (value) =>
        value === "" ? "Required field cannot be empty" : null,
    },
  });
  const handleAddResource = async (resourceData: any) => {
    // 預期 resourceData 的結構：
    // {
    //    resource_name: "機房 A",
    //    resource_type: "room",
    //    location: "資訊館 3 樓",
    //    day_of_week: [1, 3, 5], // 陣列傳過去
    //    open_time: "22:52",    // 24小時制字串
    //    close_time: "23:50",
    //    description: "內有高階伺服器",
    //    status: "available"
    // }

    try {
      const response = await fetch("/hw3_614410164/backend/add_resource.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resourceData),
        credentials: "include", // 確保 Session 認證順利通過
      });

      const result = await response.json();

      if (result.success) {
        alert("資源新增成功！");
        close();
        // 可以在這裡做畫面重導向或清表單
      } else {
        alert("新增失敗：" + result.message);
      }
    } catch (error) {
      console.error("請求失敗:", error);
      alert("網路連線異常");
    }
  };
  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleAddResource(values))}>
        <TextInput
          label="Resource Name"
          placeholder="e.g.projector, meeting room library"
          {...form.getInputProps("resource_name")}
          key={form.key("resource_name")}
        />
        <Select
          label="Category"
          defaultValue={"All"}
          placeholder="Pick value"
          data={["All", "Space", "3C Device", "Books"]}
          {...form.getInputProps("resource_type")}
          key={form.key("resource_type")}
        />
        <TextInput
          label="Location"
          {...form.getInputProps("location")}
          key={form.key("location")}
        />
        <Textarea
          label="Description"
          {...form.getInputProps("description")}
          key={form.key("description")}
        />
        <Select
          label="status"
          defaultValue={"All"}
          placeholder="Pick value"
          data={["active", "inative", "Maintenance"]}
          {...form.getInputProps("status")}
          key={form.key("status")}
        />
        <Checkbox.Group
          {...form.getInputProps("day_of_week")}
          key={form.key("day_of_week")}
          label="Select your favorite frameworks/libraries"
        >
          <Group my={5}>
            <Checkbox value="1" label="Mon" />
            <Checkbox value="2" label="Tue" />
            <Checkbox value="3" label="Wed" />
            <Checkbox value="4" label="Thu" />
            <Checkbox value="5" label="Fri" />
            <Checkbox value="6" label="Sat" />
            <Checkbox value="7" label="Sun" />
          </Group>
        </Checkbox.Group>
        <TimeInput
          label="Open Time"
          classNames={{ input: "timeinput", section: "timeinput" }}
          rightSection={"🕑"}
          rightSectionProps={{
            onClick: () => timeRef1.current?.showPicker(),
          }}
          ref={timeRef1}
          onClick={() => timeRef1.current?.showPicker()}
          {...form.getInputProps("open_time")}
          key={form.key("open_time")}
        />
        <TimeInput
          label="Close Time"
          classNames={{ input: "timeinput", section: "timeinput" }}
          rightSection={"🕑"}
          rightSectionProps={{
            onClick: () => timeRef2.current?.showPicker(),
          }}
          ref={timeRef2}
          onClick={() => timeRef2.current?.showPicker()}
          {...form.getInputProps("close_time")}
          key={form.key("close_time")}
        />

        <Button type="submit" mt="md" mr="lg" color="#4d3c2d">
          Save
        </Button>
        <Button mt="md" color="red" onClick={close}>
          Cancel
        </Button>
      </form>
    </div>
  );
}
