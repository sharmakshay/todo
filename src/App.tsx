import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/taskList";
import { Task, TaskType } from "./interfaces/task";
import { Badge } from "./components/ui/badge";
import { Smile } from "lucide-react";

const App = () => {
  const [task, setTask] = useState<Task>({ id: "", name: "", status: TaskType.Pending });
  const [pendingList, setPendingList] = useState<Task[]>([]);
  const [doneList, setDoneList] = useState<Task[]>([]);

  const addPendingTask = () => {
    if (task.id) {
      setPendingList([task, ...pendingList]);
      setTask({ id: "", name: "", status: TaskType.Pending });
    }
  };

  const markDoneTask = (id: string) => {
    const completedTodo = pendingList.filter((todo) => todo.id === id)[0];
    completedTodo.status = TaskType.Done;
    setDoneList([completedTodo, ...doneList]);

    setPendingList([...pendingList.filter((todo) => todo.id !== completedTodo.id)]);
  };

  const resetDoneTask = (id: string) => {
    const doneTodo = doneList.filter((todo) => todo.id === id)[0];
    doneTodo.status = TaskType.Pending;
    setPendingList([doneTodo, ...pendingList]);

    setDoneList([...doneList.filter((todo) => todo.id !== doneTodo.id)]);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div>
          <div className="flex justify-center">
            <Input
              autoFocus
              placeholder="What would you like to achieve today?"
              value={task.name}
              onChange={(e) => setTask({ id: Date.now().toString(), name: e.target.value, status: TaskType.Pending })}
              onKeyDown={(e) => (e.key === "Enter" ? addPendingTask() : undefined)}
            />
          </div>
          {pendingList.length === 0 && doneList.length === 0 ? (
            <div className="h-full flex justify-center items-center text-gray-400 mt-24">
              No pending tasks
              <Smile className="h-5 w-5 ml-4" />
            </div>
          ) : (
            <Tabs defaultValue={TaskType.Pending} className="mt-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value={TaskType.Pending}>
                  Pending {pendingList.length ? <Badge className="ml-4">{pendingList.length}</Badge> : ``}
                </TabsTrigger>
                <TabsTrigger value={TaskType.Done}>Done</TabsTrigger>
              </TabsList>
              <TabsContent value={TaskType.Pending}>
                <TaskList
                  taskType={TaskType.Pending}
                  tasks={pendingList}
                  setTasks={setPendingList}
                  taskAction={markDoneTask}
                />
              </TabsContent>
              <TabsContent value={TaskType.Done}>
                <TaskList taskType={TaskType.Done} tasks={doneList} setTasks={setDoneList} taskAction={resetDoneTask} />
              </TabsContent>
            </Tabs>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default App;
