import { Button, Select, Switch, TextInput } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import ResourceCard from "../components/ResourceCard";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");
  const [resources, setResources] = useState([]);
  const [reStatus, setReStatus] = useState<string | null>("All");
  const [category, setCatgory] = useState<string | null>("All");
  const [day, setDay] = useState<string | null>(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const timeRef1 = useRef<HTMLInputElement>(null);
  const timeRef2 = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // 切換語系的方法
  };

  // 執行測試
  useEffect(() => {
    fetch("/hw3_614410164/backend/get_resource_detail.php")
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
    console.log("resources", resources);
    console.log("reStatus", reStatus);
    console.log("category", category);
    console.log("textFilter", textFilter);
  }, [day, start, end, resources, reStatus, category, textFilter]);
  useEffect(() => {
    if (start !== "" && end !== "" && start > end) {
      alert("開始時間不可大於結束時間");
    }
  }, [start, end]);
  useEffect(() => {
    if (checked) {
      changeLanguage("zh-TW");
    } else {
      changeLanguage("en");
    }
  }, [checked]);
  return (
    <>
      <div className="absolute right-10">
        <Switch
          size="xl"
          onLabel="中"
          offLabel="EN"
          color="orange"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
      </div>
      <div className="mx-20 my-10 p-5  bg-white border border-[#e6e5e3] rounded-lg shadow-lg">
        <div className=" flex gap-5 mb-5">
          <Select
            label={t("Category")}
            value={category}
            placeholder="Pick value"
            data={["All", "Space", "3C Device", "Books"]}
            className="flex-1"
            onChange={setCatgory}
          />
          <DateInput
            valueFormat="YYYY MMM DD"
            label={t("Date")}
            value={day}
            placeholder="Date"
            className="flex-2"
            onChange={setDay}
          />
          <TimeInput
            label={t("Start Time")}
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
            label={t("End Time")}
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
            label={t("Reservation Status")}
            placeholder="Pick value"
            value={reStatus}
            onChange={setReStatus}
            data={["All", "available", "reserved", "in use"]}
            className="flex-1"
          />
        </div>
        <div className="flex justify-between gap-5">
          <TextInput
            label={t("Keyword (name/location/description)")}
            placeholder="e.g.projector, meeting room library"
            className="flex-5"
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
          />
          <div className="flex items-end flex-2 gap-5">
            <Button
              className="flex-1"
              variant="filled"
              color="#8e735b"
              onClick={() => {
                setText("");
                setTextFilter("");
              }}
            >
              {t("Reset")}
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              color="#8e735b"
              onClick={() => {
                setTextFilter(text);
              }}
            >
              {t("Apply")}
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-20 my-10 p-5  bg-white border border-[#e6e5e3] rounded-lg shadow-lg grid grid-cols-3 gap-5">
        {resources.map((el: any, index) => {
          if (category !== "All" && category !== el.resource_type) return null;
          if (day) {
            const date = new Date(day.replace(/-/g, "/"));
            const dayIndex = date.getDay(); // 會得到 4
            // 建立你自訂的名稱對照表（順序必須從週日開始）
            const weekdays = ["7", "1", "2", "3", "4", "5", "6"];
            if (
              !el.day_of_week
                .slice(1, -1)
                .split(",")
                .includes(weekdays[dayIndex])
            )
              return;
          }
          if (start !== "" && end !== "" && start > end) return;
          if (
            start !== "" &&
            end !== "" &&
            (start < el.open_time || end > el.close_time)
          )
            return;
          if (reStatus !== "All" && reStatus !== el.reservation_status) return;
          if (
            textFilter !== "" &&
            !el.resource_name.includes(textFilter) &&
            !el.location.includes(textFilter) &&
            !el.description.includes(textFilter)
          )
            return;

          return (
            <ResourceCard
              id={el.resource_id}
              resourceType={el.resource_type}
              resourceStatus={el.reservation_status}
              resourceName={el.resource_name}
              location={el.location}
              description={el.description}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}
