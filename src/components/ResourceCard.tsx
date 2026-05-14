import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function ResourceCard({
  resourceType = "3C",
  resourceStatus = "Available",
  resourceName = "投影機777",
  location = "器材室",
  description = "1080P、HDMI、含遙控器",
}) {
  return (
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
        <Button className="flex-1" variant="outline" color="#8e735b">
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
  );
}
