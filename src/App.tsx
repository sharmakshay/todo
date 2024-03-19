import { useState } from "react";
import { Input } from "./components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Task, TaskType } from "./interfaces/task";

import TaskList from "./components/taskList";

const App = () => {
  const [task, setTask] = useState<Task>({ id: "", name: "", isDone: false });
  const [pendingList, setPendingList] = useState<Task[]>([]);
  const [doneList, setDoneList] = useState<Task[]>([]);

  const addPendingTask = () => {
    if (task.id) {
      setPendingList([task, ...pendingList]);
      setTask({ id: "", name: "", isDone: true });
    }
  };

  const markDoneTask = (id: string) => {
    const completedTodo = pendingList.filter((todo) => todo.id === id)[0];
    completedTodo.isDone = true;
    setDoneList([completedTodo, ...doneList]);

    setPendingList([...pendingList.filter((todo) => todo.id !== completedTodo.id)]);
  };

  const resetDoneTask = (id: string) => {
    const doneTodo = doneList.filter((todo) => todo.id === id)[0];
    doneTodo.isDone = true;
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
              placeholder="What would you like to do?"
              value={task.name}
              onChange={(e) => setTask({ id: Date.now().toString(), name: e.target.value, isDone: false })}
              onKeyDown={(e) => (e.key === "Enter" ? addPendingTask() : undefined)}
            />
          </div>
          <Tabs defaultValue={TaskType.Pending} className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={TaskType.Pending}>Pending ({pendingList.length})</TabsTrigger>
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
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default App;
