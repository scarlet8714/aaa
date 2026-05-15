import { Button, Select, TextInput } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import ResourceCard from "../components/ResourceCard";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [resources, setResources] = useState([]);
  const [day, setDay] = useState<string | null>(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const timeRef1 = useRef<HTMLInputElement>(null);
  const timeRef2 = useRef<HTMLInputElement>(null);

  // 執行測試
  useEffect(() => {
    fetch("/hw3_614410164/backend/get_resource.php")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setResources(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    console.log("day", day);
    console.log("start", start);
    console.log("end", end);
  }, [day, start, end]);
  return (
    <>
      <div className="mx-20 my-10 p-5  bg-white border border-[#e6e5e3] rounded-lg shadow-lg">
        <div className=" flex gap-5 mb-5">
          <Select
            label="Category"
            defaultValue={"All"}
            placeholder="Pick value"
            data={["All", "Space", "3C Device", "Books"]}
            className="flex-1"
          />
          <DateInput
            valueFormat="YYYY MMM DD"
            label="Date"
            value={day}
            placeholder="Date"
            className="flex-2"
            onChange={setDay}
          />
          <TimeInput
            label="Input label"
            className="flex-1"
            classNames={{ input: "timeinput", section: "timeinput" }}
            rightSection={"🕑"}
            rightSectionProps={{
              onClick: () => timeRef1.current?.showPicker(),
            }}
            ref={timeRef1}
            onClick={() => timeRef1.current?.showPicker()}
            onChange={(e) => setStart(e.currentTarget.value)}
          />
          <TimeInput
            label="Input label"
            className="flex-1"
            classNames={{ input: "timeinput", section: "timeinput" }}
            rightSection={"🕑"}
            rightSectionProps={{
              onClick: () => timeRef2.current?.showPicker(),
            }}
            onChange={(e) => setEnd(e.currentTarget.value)}
            ref={timeRef2}
            onClick={() => timeRef2.current?.showPicker()}
          />
          <Select
            label="Reservation Status"
            placeholder="Pick value"
            defaultValue={"All"}
            data={[
              "All",
              "Available(not reserved)",
              "Reserved(not started)",
              "In Use",
            ]}
            className="flex-1"
          />
        </div>
        <div className="flex justify-between gap-5">
          <TextInput
            label="Keyword (name/location/description)"
            placeholder="e.g.projector, meeting room library"
            className="flex-5"
          />
          <div className="flex items-end flex-2 gap-5">
            <Button className="flex-1" variant="filled" color="#8e735b">
              Reset
            </Button>
            <Button className="flex-1" variant="outline" color="#8e735b">
              Apply
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-20 my-10 p-5  bg-white border border-[#e6e5e3] rounded-lg shadow-lg grid grid-cols-3 gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <ResourceCard key={index} />
        ))}
      </div>
    </>
  );
}
