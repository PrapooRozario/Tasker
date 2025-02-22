"use client";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

export default function Navbar() {
  const nameRef = useRef();
  const desRef = useRef();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (task) =>
      axios.post("https://tasker-psi-six.vercel.app/api/tasks", { task }),
    onSuccess: () =>
      toast.success(
        "Task Added Successfully",
        queryClient.invalidateQueries({ queryKey: ["tasks"] })
      ),
    onError: (error) => toast.error(error.message),
  });
  const handleAddTask = () => {
    const name = nameRef.current.value;
    const description = desRef.current.value;
    if (!name || !description) {
      toast.error("Please fill all fields");
      return;
    }
    const task = {
      title: name,
      description,
      category: "To-Do",
      timestamp: new Date(),
    };
    if (name && description) {
      mutate(task);
    }
  };
  const path = usePathname();
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <>
      {path === "/login" ? (
        ""
      ) : (
        <div className="bg-white sticky top-0 text-center pb-20 pt-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <h1 className="text-[#0D062D] md:text-base text-sm">
                Prapoo Rozario
              </h1>
              <p className="text-[#787486] md:text-sm text-xs">
                albart2022@gmail.com
              </p>
            </div>
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="primary" type="button">
                  <Plus /> Add Task
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 relative right-14 p-5">
                <div className="grid gap-4">
                  <form>
                    <div className="space-y-2 mb-4">
                      <h1 className="font-semibold text-lg leading-none">
                        Add Task
                      </h1>
                      <p className="text-sm text-[#353535]">
                        Add Task for your project.
                      </p>
                    </div>
                    <div>
                      <div>
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                          id="name"
                          ref={nameRef}
                          className="my-2"
                          placeholder="Project Name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="des">Description</Label>
                        <Textarea
                          id="des"
                          ref={desRef}
                          placeholder="Description"
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddTask()}
                      variant="primary"
                      disabled={isPending}
                      className="mt-4"
                      type="button"
                    >
                      {isPending ? (
                        <div className="w-5 h-5 border-[1px]  border-t-neutral-500 border-neutral-300 rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Plus /> Add Task
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
}
