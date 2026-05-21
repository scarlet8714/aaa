import { Button, Modal, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export default function AllBookings() {
  const [data, setData] = useState<any>(null);
  const [filter, setFilter] = useState<string | null>("All");
  const [bid, setBid] = useState<number>(0);
  // const [cancelText, setCancelText] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const handleAdminCancelBooking = async () => {
    try {
      const response = await fetch(
        "/hw3_614410164/backend/cancel_booking_admin.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: bid,
            cancel_reason: "Cancelled by admin",
          }),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.success) {
        alert("管理員強制取消成功！");
        setRefresh((state) => state + 1);
        // 建議：重新呼叫 fetchAllBookingsForAdmin() 刷新的總表畫面
      } else {
        alert("操作失敗：" + result.message);
      }
    } catch (error) {
      console.error("管理員取消請求失敗:", error);
      alert("網路連線異常");
    }
  };
  useEffect(() => {
    const fetchAllBookingsForAdmin = async () => {
      try {
        const response = await fetch(
          "/hw3_614410164/backend/get_all_booking.php",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const result = await response.json();

        if (result.success) {
          console.log("全系統預約總表：", result.data);
          console.log(result.data);
          setData(result.data);
          // setAllBookings(result.data);
        } else {
          // 如果一般學生不小心戳到這支 API，會直接跳出後端回傳的「權限不足」
          alert("無法取得資料：" + result.message);
        }
      } catch (error) {
        console.error("網路連線失敗:", error);
      }
    };
    fetchAllBookingsForAdmin();
  }, [refresh]);

  return (
    <>
      <div className="mx-60 my-30">
        <div className="flex justify-between">
          <div className="text-xl text-[#4d3c2d]">AllBookings</div>
          <Button
            mt="md"
            color="red"
            onClick={() => {
              setRefresh((state) => state + 1);
            }}
          >
            Refresh
          </Button>
        </div>
        <TextInput
          label="Search (user/resource/location/ID)"
          value={textFilter}
          onChange={(event) => setTextFilter(event.currentTarget.value)}
        />
        <Select
          label="Category"
          value={filter}
          onChange={setFilter}
          placeholder="Pick value"
          data={["All", "Space", "3C Device", "Books"]}
        />
        {data &&
          data.map((el: any) => {
            if (filter !== "All" && filter !== el.resource_type) {
              return;
            }
            if (
              (textFilter !== "" &&
                (el.requester_name.includes(textFilter) ||
                  el.resource_name.includes(textFilter) ||
                  el.location.includes(textFilter) ||
                  String(el.booking_id).includes(textFilter))) ||
              textFilter === ""
            ) {
              return (
                <div className="flex justify-between mt-10 border-amber-200 rounded-2xl shadow-xl p-5">
                  <div className="flex flex-col gap-5">
                    <div>
                      {el.resource_name} {el.booking_id}
                    </div>
                    <div>🥸Who:{el.email}</div>
                    <div>📍Where: {el.location}</div>
                    <div>
                      🕑When: {el.start_time}-{el.end_time}
                    </div>
                    <div>❗Cancel Reason: {el.cancel_reason}</div>
                    <div className="flex gap-5">
                      <Button
                        variant="outline"
                        color="#8e735b"
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
                      <Button variant="filled" color="#8e735b">
                        Mark Completed
                      </Button>
                      <Button
                        variant="filled"
                        color="red"
                        onClick={() => {
                          open();
                          setBid(el.booking_id);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                  <div className="border border-amber-950 text-amber-950 rounded-2xl p-2 h-max">
                    {el.booking_status}
                  </div>
                </div>
              );
            } else return <></>;
          })}
      </div>
      <Modal opened={opened} onClose={close} title="Authentication">
        <TextInput
          label="Cancel reason"
          value={"Cancelled by admin"}
          className="mb-5"
        />
        <Button
          variant="filled"
          color="#8e735b"
          onClick={() => {
            handleAdminCancelBooking();
            close();
          }}
          className="mr-5"
        >
          Confirm
        </Button>
        <Button variant="filled" color="#8e735b" onClick={close}>
          Cancel
        </Button>
      </Modal>
    </>
  );
}
