import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const TaskColumn = ({ category, tasks, loading }) => {
  const { setNodeRef } = useDroppable({ id: category });

  return (
    <section ref={setNodeRef} className="p-4 min-h-[300px]">
      <header className="sticky top-32">
        <div className="flex items-center gap-3">
          {category === "To-Do" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="8"
              viewBox="0 0 9 8"
              fill="none"
            >
              <circle cx="4.39703" cy="3.99636" r="3.73285" fill="#973FCF" />
            </svg>
          ) : category === "In Progress" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="8"
              viewBox="0 0 9 8"
              fill="none"
            >
              <circle cx="4.39703" cy="3.99636" r="3.73285" fill="#FFA500" />
            </svg>
          ) : category === "Done" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="8"
              viewBox="0 0 9 8"
              fill="none"
            >
              <circle cx="4.39703" cy="3.99636" r="3.73285" fill="#8BC48A" />
            </svg>
          ) : (
            ""
          )}
          <h1 className="text-[#0D062D] font-bold">{category}</h1>
          <span className="bg-[#E0E0E0] rounded-full w-5 h-5 inline-flex items-center justify-center">
            <span className="text-xs text-[#625F6D] font-medium">
              {tasks?.length}
            </span>
          </span>
        </div>
        <div
          className={`w-full h-[3px] mt-4 ${
            category === "To-Do"
              ? "bg-[#973FCF]"
              : category === "In Progress"
              ? "bg-[#FFA500]"
              : category === "Done"
              ? "bg-[#8BC48A]"
              : ""
          }`}
          role="separator"
        ></div>
      </header>
      <div className="mt-6 space-y-8">
        {tasks?.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-[3px]  border-t-neutral-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskColumn;
