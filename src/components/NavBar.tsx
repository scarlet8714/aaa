import { Button, Text } from "@mantine/core";

export default function NavBar() {
  return (
    <div className="h-18 bg-[#fdfdfd] w-full shadow-lg px-20 flex items-center justify-between">
      <div className="flex">
        <div className=" w-12 h-12 rounded-xl bg-linear-to-br from-[#a28470] to-[#c8a38c] p-1 mr-5">
          <div className=" w-5 h-5 rounded-full bg-radial from-white to-transparent"></div>
        </div>
        <div>
          <Text className="text-[#4d3c2d]" size="xl" fw={600}>
            Campus Reservation
          </Text>
          <Text size="sm" className="text-[#9f9b98]">
            Campus Equipment/Space Reservation
          </Text>
        </div>
      </div>
      <div className="flex gap-5 ">
        <Button
          color="#dcdcd7"
          radius={50}
          variant="outline"
          classNames={{ root: "navbtn" }}
        >
          <span className="text-[#4d3c2d]">🏠 Home</span>
        </Button>
        <Button
          color="#dcdcd7"
          radius={50}
          variant="outline"
          classNames={{ root: "navbtn" }}
        >
          <span className="text-[#4d3c2d]"> 🧟‍♂️ User Page</span>
        </Button>
      </div>
      <Button
        variant="gradient"
        gradient={{ from: "#a0876d", to: "#d8ccbc", deg: 90 }}
        w={200}
      >
        Login / Register
      </Button>
    </div>
  );
}
