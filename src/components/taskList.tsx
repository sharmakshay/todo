import { AnimatePresence, Reorder } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { ListRestart } from "lucide-react";

import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Task, TaskType } from "../interfaces/task";

interface TaskListProps {
  taskType: TaskType;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  taskAction: (id: string) => void;
}

const TaskList = ({ taskType, tasks, setTasks, taskAction }: TaskListProps) => {
  const getActionButton = (taskType: TaskType, taskId: string) => {
    switch (taskType) {
      case TaskType.Pending: {
        return <Checkbox onClick={() => taskAction(taskId)} />;
      }
      case TaskType.Done: {
        //statements;
        return (
          <ListRestart
            className="h-5 w-5 text-gray-500 hover:text-gray-400"
            role="button"
            onClick={() => taskAction(taskId)}
          />
        );
      }
      default: {
        console.log("incorrect task type");
        break;
      }
    }
  };

  return (
    <AnimatePresence>
      <Reorder.Group values={tasks} onReorder={setTasks} dragListener={false}>
        {tasks.map((task: Task) => (
          <Reorder.Item
            key={task.id}
            value={task.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <Card className="mt-8">
              <CardContent className="pt-6 pl-8 w-full">
                <div className="flex items-center">
                  <div className="mr-6">{getActionButton(taskType, task.id)}</div>
                  <span>{task.name}</span>
                </div>
              </CardContent>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </AnimatePresence>
  );
};

export default TaskList;
