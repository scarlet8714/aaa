import { Button } from "@mantine/core";

export default function ResourceCard() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="border rounded-full">Equipment</div>
      <div className="border rounded-full">Available</div>
      <div className="font-bold text-[#4d3c2d]">投影機 777</div>
      <div>Location: 器材室</div>
      <div>Category: 3C</div>
      <div>1080P、HDMI、含遙控器</div>
      <div className="flex gap-5">
        <Button className="flex-1">Reserve</Button>
        <Button className="flex-1">Details</Button>
      </div>
    </div>
  );
}
