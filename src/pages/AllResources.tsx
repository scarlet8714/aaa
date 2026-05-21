import { Button, Modal, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import AddResource from "../components/AddResource";
import EditResource from "../components/EditResource";

export default function AllResources() {
  const [resources, setResources] = useState<any>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);
  const [id, setId] = useState<number>(0);
  const [editResource, setEditResource] = useState<any>(null);
  function handleOpenEditModal(el: any) {
    setId(el.resource_id);
    setEditResource(el);
    open2();
  }

  useEffect(() => {
    fetch("/hw3_614410164/backend/get_resource.php")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) setResources(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    console.log(resources);
  }, [resources]);
  return (
    <>
      <div className="mx-60 my-20">
        <div className="flex justify-between">
          <div className="text-3xl text-[#4d3c2d]">AllResources</div>
          <Button variant="filled" color="#8e735b" onClick={open}>
            Add Resource
          </Button>
        </div>
        <div className="mx-20 flex gap-5 mt-10">
          <TextInput
            label="Keyword (name/location/description)"
            placeholder="e.g.projector, meeting room library"
            className="flex-3"
          />
          <Select
            label="type"
            defaultValue={"All"}
            placeholder="Pick value"
            data={["All", "Space", "3C Device", "Books"]}
            className="flex-1"
          />
          <Select
            label="status"
            defaultValue={"All"}
            placeholder="Pick value"
            data={["All", "Space", "3C Device", "Books"]}
            className="flex-1"
          />
        </div>
        <div className="mx-20 flex flex-col gap-5 mt-10">
          {resources.map((el: any) => {
            return (
              <div
                key={el.resource_id}
                className="shadow-md border-0 px-5 py-3 rounded-md w-full flex justify-between"
              >
                <div className="flex flex-col gap-5">
                  <div className="text-xl text-[#4d3c2d]">
                    {el.resource_name}{" "}
                    <span className="text-xl text-gray-400">
                      #{el.resource_id}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>Location: {el.location}</div>
                    <div>Category: {el.resource_type}</div>
                    <div>Type: Equipment</div>
                    <div>Status: {el.status}</div>
                    <div>
                      Open Days:{" "}
                      {el.day_of_week
                        .slice(1, -1)
                        .split(",")
                        .sort()
                        .map((el: any, i: number, arr: any) => {
                          let returnStr = "";
                          switch (el) {
                            case "1":
                              returnStr += "Mon";
                              break;
                            case "2":
                              returnStr += "Tue";
                              break;
                            case "3":
                              returnStr += "Wed";
                              break;
                            case "4":
                              returnStr += "Thu";
                              break;
                            case "5":
                              returnStr += "Fri";
                              break;
                            case "6":
                              returnStr += "Sat";
                              break;
                            case "7":
                              returnStr += "Sun";
                              break;
                            default:
                              break;
                          }
                          if (i != arr.length - 1) return returnStr + ", ";
                          else {
                            return returnStr;
                          }
                        })}
                    </div>
                    <div>
                      Open Start: {el.open_time.slice(0, -3)}-
                      {el.close_time.slice(0, -3)}
                    </div>
                  </div>
                  <div>{el.description}</div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="bg-gray-300 text-gray-500 border-0 rounded-full px-5 py-1 shadow-xs">
                    {el.status}
                  </div>
                  <Button
                    variant="filled"
                    color="#8e735b"
                    onClick={() => handleOpenEditModal(el)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Authentication">
        <AddResource close={close} />
      </Modal>
      <Modal opened={opened2} onClose={close2} title="Authentication">
        <EditResource id={id} oldValues={editResource} close={close2} />
      </Modal>
    </>
  );
}
