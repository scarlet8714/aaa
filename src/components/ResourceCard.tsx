import { Button, Modal, TextInput } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRef } from "react";

export default function ResourceCard({
  id = 1,
  resourceType = "3C Device",
  resourceStatus = "Available",
  resourceName = "投影機777",
  location = "器材室",
  description = "1080P、HDMI、含遙控器",
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const timeRef1 = useRef<HTMLInputElement>(null);
  const timeRef2 = useRef<HTMLInputElement>(null);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      day: "",
      open_time: "",
      close_time: "",
    },
    // validate: {

    // },
  });
  const handleBooking = async (resourceId: number, bookingDetails: any) => {
    // bookingDetails 格式預期：
    // {
    //   day: "2026-05-06",
    //   start_time: "10:10",
    //   end_time: "13:11"
    // }

    const sendData = {
      resource_id: resourceId,
      ...bookingDetails,
    };

    try {
      const response = await fetch(
        "/hw3_614410164/backend/booking_resource.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.success) {
        alert("預約成功！");
        close();
      } else {
        alert("預約失敗：" + result.message);
      }
    } catch (error) {
      console.error("請求發送失敗:", error);
      alert("網路異常，請稍後再試");
    }
  };
  return (
    <>
      <div className="flex flex-col gap-5 p-5 shadow-md rounded-xl hover:translate-1 border-b-amber-50">
        <div className="border rounded-full p-2 w-max border-taupe-400 bg-gray-50">
          Equipment
        </div>
        {/* resource status */}
        <div className="border rounded-full p-2 w-1/2 border-taupe-400 bg-gray-50">
          {resourceStatus}
        </div>
        {/* resource name */}
        <div className="font-bold text-[#4d3c2d] p-1">{resourceName}</div>
        {/* location */}
        <div className="p-1">Location: {location}</div>
        {/* resource type */}
        <div className="p-1">Category: {resourceType}</div>
        {/* description */}
        <div className="p-1">{description}</div>
        <div className="flex gap-5">
          <Button
            className="flex-1"
            variant="outline"
            color="#8e735b"
            onClick={open}
          >
            Reserve
          </Button>
          <Button
            className="flex-1"
            variant="outline"
            color="#8e735b"
            onClick={() =>
              notifications.show({
                title: "Resource info",
                message: `${resourceName} | ${location} | Status:${resourceStatus}`,
                color: "#8e735b",
              })
            }
          >
            Details
          </Button>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="Reserve Resource"
        color="#4d3c2d"
        size="xl"
      >
        <div className="p-10">
          <form onSubmit={form.onSubmit((values) => handleBooking(id, values))}>
            <div className="grid grid-cols-2 gap-5">
              <TextInput
                size="md"
                label="Resource"
                value={resourceName}
                placeholder="Set your display name"
                key={form.key("resource")}
                labelProps={{ className: "text-[#8e735b]" }}
                className="mb-4"
                inputSize="35"
                {...form.getInputProps("resource")}
              />
              <TextInput
                size="md"
                label="Type"
                placeholder="Set your display name"
                value="Equipment"
                labelProps={{ className: "text-[#8e735b]" }}
                className="mb-4"
                inputSize="35"
              />
            </div>
            <div className="flex gap-5">
              <DateInput
                valueFormat="YYYY MMM DD"
                label="Date"
                // value={day}
                placeholder="Date"
                className="flex-2"
                // onChange={setDay}
                {...form.getInputProps("day")}
                key={form.key("day")}
              />
              <TimeInput
                label="Open Time"
                classNames={{ input: "timeinput", section: "timeinput" }}
                rightSection={"🕑"}
                rightSectionProps={{
                  onClick: () => timeRef1.current?.showPicker(),
                }}
                ref={timeRef1}
                onClick={() => timeRef1.current?.showPicker()}
                {...form.getInputProps("start_time")}
                key={form.key("start_time")}
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
                {...form.getInputProps("end_time")}
                key={form.key("end_time")}
              />
            </div>
            <div className="mt-10 gap-5 flex justify-end">
              <Button variant="outline" color="#8e735b" onClick={close}>
                Cancel
              </Button>
              <Button variant="filled" color="#8e735b" type="submit">
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
