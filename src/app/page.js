"use client";
import TaskColumn from "@/components/TaskColumn";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Page() {
  const sensors = useSensors(useSensor(PointerSensor, TouchSensor));
  const [tasks, setTasks] = useState([]);
  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://tasker-psi-six.vercel.app/api/tasks"
      );
      return data;
    },
  });

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const draggedTaskId = active?.id;
    const newCategory = over?.id;

    const draggedTask = tasks?.find((task) => task?._id === draggedTaskId);
    if (!draggedTask || draggedTask?.category === newCategory) return;

    const updatedTasks = tasks.map((task) =>
      task._id === draggedTaskId ? { ...task, category: newCategory } : task
    );

    setTasks(updatedTasks);

    axios
      .put(`https://tasker-psi-six.vercel.app/api/tasks/${draggedTaskId}`, {
        category: newCategory,
      })
      .then(() => {
        refetch();
      })
      .catch(() => {
        const revertedTasks = tasks.map((task) =>
          task._id === draggedTaskId
            ? { ...task, category: draggedTask.category }
            : task
        );
        setTasks(revertedTasks);
      });
  };
  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
          {["To-Do", "In Progress", "Done"]?.map((category) => (
            <TaskColumn
              key={category}
              category={category}
              loading={isLoading}
              tasks={tasks?.filter((task) => task.category === category)}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
}
