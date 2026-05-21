import { Button, Modal, SegmentedControl, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export default function UserBookings() {
  const [filter, setFilter] = useState("All");
  const [bookings, setBookings] = useState<any>(null);
  const [resourceId, setResourceId] = useState(null);
  const [clicked, setClicked] = useState(0);
  const [cancelValue, setCancelValue] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const handleCancelBooking = async () => {
    try {
      const response = await fetch(
        "/hw3_614410164/backend/cancel_booking.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: resourceId,
            cancel_reason: cancelValue,
          }),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.success) {
        alert("預約已取消成功！");
        setClicked((state) => state + 1);
        close();
        // 建議：可以在這裏重新呼叫 fetchUserBookings() 來重新整理畫面列表
      } else {
        alert("取消失敗：" + result.message);
      }
    } catch (error) {
      console.error("取消請求失敗:", error);
      alert("網路連線異常");
    }
  };

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await fetch("/hw3_614410164/backend/get_booking.php", {
          method: "GET",
          credentials: "include", // 核心：帶上 Cookie/Session
        });

        const result = await response.json();

        if (result.success) {
          console.log("用戶預約紀錄：", result.data);
          setBookings(result.data);
          // 這裡可以將資料存入 React state
          //   setUserBookings(result.data);
        } else {
          console.error("抓取預約失敗：", result.message);
        }
      } catch (error) {
        console.error("網路連線失敗:", error);
      }
    };
    fetchUserBookings();
  }, [clicked]);
  useEffect(() => {
    console.log(bookings);
  }, [bookings]);
  return (
    <>
      <div className="mx-60 my-30">
        <div>
          <div className="text-2xl text-[#4d3c2d] mb-10">My Reservations</div>
          <div className="flex justify-between">
            <SegmentedControl
              data={["All", "Booked", "Cancelled", "Completed"]}
              size="lg"
              value={filter}
              onChange={setFilter}
            />
            <Button
              variant="filled"
              color="#8e735b"
              radius={"xl"}
              onClick={() => setClicked((state) => state + 1)}
            >
              Refresh
            </Button>
          </div>
          {bookings &&
            bookings.map((el: any, index: number) => {
              if (
                (filter === "Cancelled" && el.booking_status === "cancelled") ||
                (filter === "Completed" && el.booking_status === "completed") ||
                (filter === "Booked" && el.booking_status === "booked") ||
                filter === "All"
              ) {
                return (
                  <div className="flex justify-between border border-[#8e735bbd] rounded-md shadow-xl mt-10 p-5">
                    <div
                      className="flex flex-col gap-5 justify-between "
                      id={String(index)}
                    >
                      <div>{el.resource_name}</div>
                      <div>&nbsp;🎈{el.location}</div>
                      <div>
                        &nbsp;🕑{el.start_time.slice(0, -3)}-
                        {el.end_time.slice(0, -3)}
                      </div>
                      <div>&nbsp;&nbsp;ID: {el.booking_id}</div>
                      <div>❗{el.cancel_reason}</div>
                      <div className="flex gap-5">
                        <Button
                          variant="outline"
                          color="#8e735b"
                          radius={"md"}
                          size="md"
                          onClick={() =>
                            notifications.show({
                              title: "Resource info",
                              message: `${el.resource_name} | ${el.location} | Status:${el.booking_status}`,
                              color: "#8e735b",
                            })
                          }
                        >
                          Details
                        </Button>
                        <Button
                          variant="filled"
                          color="red"
                          radius={"md"}
                          size="md"
                          onClick={() => {
                            open();
                            setResourceId(el.resource_id);
                          }}
                          disabled={
                            el.booking_status === "cancelled" ? true : false
                          }
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-5 h-max items-center mt-10">
                      <div className="text-md text-[#8e735b]">Equipment</div>
                      <div className="text-md text-[#8e735b] border border-[#8e735b] h-max rounded-2xl p-2">
                        {el.booking_status}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Cancal Reservation">
        <TextInput
          label="Cancel reason"
          placeholder="Thie is required"
          onChange={(event) => setCancelValue(event.currentTarget.value)}
          value={cancelValue}
        />
        <div className="flex justify-end mt-5 gap-5">
          <Button
            variant="filled"
            color="red"
            radius={"md"}
            size="xs"
            onClick={() => {
              if (cancelValue === "") {
                alert("取消理由為必填");
                return;
              }
              handleCancelBooking();
            }}
          >
            Confirm Cancel
          </Button>
          <Button
            variant="outline"
            color="#8e735b"
            radius={"md"}
            size="xs"
            onClick={close}
          >
            Back
          </Button>
        </div>
      </Modal>
    </>
  );
}
