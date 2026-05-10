import { Button, Select, TextInput } from "@mantine/core";
import NavBar from "../components/NavBar";
import { DateInput, TimeInput } from "@mantine/dates";
import ResourceCard from "../components/ResourceCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [resources, setResources] = useState([]);
  // 執行測試
  useEffect(() => {
    fetch(
      "http://wwweb2026.csie.io:51010/hw3_614410164/backend/get_resource.php",
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setResources(res.data);
      })
      .catch((err) => console.error(err));
    console.log(resources);
  }, []);
  useEffect(() => {
    console.log(resources);
  }, [resources]);
  return (
    <div className="w-full">
      <NavBar />
      <div className="mx-20 my-10 p-5  bg-white border border-[#e6e5e3] rounded-lg shadow-lg">
        <div className=" flex gap-5 mb-5">
          <DateInput
            valueFormat="YYYY MMM DD"
            label="Date input"
            placeholder="Date input"
            // classNames={{ wrapper: "flex-2" }}
            className="flex-2"
          />
          <Select
            label="Your favorite library"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
            className="flex-2"
          />
          <TimeInput label="Input label" className="flex-1" />
          <TimeInput label="Input label" className="flex-1" />
          <Select
            label="Your favorite library"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
            className="flex-1"
          />
        </div>
        <div className="flex justify-between gap-5">
          <TextInput
            label="Input label"
            placeholder="Input placeholder"
            className="flex-5"
          />
          <div className="flex items-end flex-2 gap-5">
            <Button className="flex-1">1</Button>
            <Button className="flex-1">2</Button>
          </div>
        </div>
      </div>
      <div className="mx-20 my-10 p-5  bg-white border border-[#e6e5e3] rounded-lg shadow-lg grid grid-cols-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <ResourceCard key={index} />
        ))}
      </div>
    </div>
  );
}
