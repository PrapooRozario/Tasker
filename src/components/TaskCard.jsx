"use client";
import { useDraggable } from "@dnd-kit/core";
import { EllipsisVertical, Pen, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRef } from "react";

export default function TaskCard({ task }) {
  const queryClient = useQueryClient();
  const nameRef = useRef(null);
  const desRef = useRef(null);
  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: async (taskId) => {
      return await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task Deleted Successfully.");
    },
  });

  const { mutate: editTask, isPending: editing } = useMutation({
    mutationFn: async ({ _id, editedTask }) => {
      return await axios.patch(
        `http://localhost:3000/api/tasks/${_id}`,
        editedTask
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success("Task Edited Successfully.");
    },
  });
  const handleEditTask = (_id) => {
    const editedTask = {
      title: nameRef.current.value,
      description: desRef.current.value,
    };
    editTask({ _id, editedTask });
  };
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
    });

  return (
    <div
      className={`flex items-center justify-between p-4 border  rounded-xl ${
        isDragging ? "border-[#973FCF]/25" : "border-white"
      }`}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        }}
      >
        <header className="flex justify-between">
          <div className="rounded-md bg-[#973FCF] text-white w-fit py-1 px-3">
            <h1 className="text-xs font-medium">Project Name</h1>
          </div>
        </header>
        <div className="mt-4">
          <h1 className="font-semibold text-lg">{task?.title}</h1>
          <p className="text-[#787486] text-xs mt-2">{task?.description}</p>
          <p className="text-[#787486] text-sm mt-3 bg-[#78748625] w-fit py-1 px-2 rounded-md font-medium">
            {new Date(task?.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Popover>
        {!isDragging && (
          <>
            <PopoverTrigger asChild>
              <button type="button" aria-label="Options">
                <EllipsisVertical />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-fit h-fit">
              <button
                onClick={() => deleteTask(task._id)}
                disabled={isPending}
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 p-2 rounded-md w-full"
              >
                <Trash2 size={16} />
                <span>{isPending ? "Deleting..." : "Delete"}</span>
              </button>
              <Popover>
                <PopoverTrigger>
                  <button className="flex items-center gap-2 text-blue-500 hover:bg-blue-50 p-2 rounded-md w-full">
                    <Pen size={16} />
                    <span>Edit</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-96 relative right-14 p-5">
                  <div className="grid gap-4">
                    <form>
                      <div className="space-y-2 mb-4">
                        <h1 className="font-semibold text-lg leading-none">
                          Edit Task
                        </h1>
                        <p className="text-sm text-[#353535]">
                          Edit Task for your project.
                        </p>
                      </div>
                      <div>
                        <div>
                          <Label htmlFor="name">Project Name</Label>
                          <Input
                            defaultValue={task?.title}
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
                            defaultValue={task?.description}
                            id="des"
                            ref={desRef}
                            placeholder="Description"
                            className="mt-2"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => handleEditTask(task?._id)}
                        variant="primary"
                        disabled={editing}
                        className="mt-4"
                        type="button"
                      >
                        {editing ? (
                          <div className="w-5 h-5 border-[1px]  border-t-neutral-500 border-neutral-300 rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Pen /> Edit Task
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </PopoverContent>
          </>
        )}
      </Popover>
    </div>
  );
}
