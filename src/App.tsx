import { useState } from "react";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { AnimatePresence, Reorder } from "framer-motion";
import { Checkbox } from "./components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListRestart } from "lucide-react";

interface Todo {
  id: string;
  name: string;
  isDone: boolean;
}

function App() {
  const [todo, setTodo] = useState<Todo>({ id: "", name: "", isDone: false });
  const [pendingList, setPendingList] = useState<Todo[]>([]);
  const [doneList, setDoneList] = useState<Todo[]>([]);

  const addTodo = () => {
    if (todo.id) {
      setPendingList([todo, ...pendingList]);
      setTodo({ id: "", name: "", isDone: true });
    }
  };

  const completePendingTodo = async (id: string) => {
    const completedTodo = pendingList.filter((todo) => todo.id === id)[0];
    completedTodo.isDone = true;
    setDoneList([completedTodo, ...doneList]);

    setPendingList([...pendingList.filter((todo) => todo.id !== completedTodo.id)]);
  };

  const recycleDoneTodo = async (id: string) => {
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
              value={todo.name}
              onChange={(e) => setTodo({ id: Date.now().toString(), name: e.target.value, isDone: false })}
              onKeyDown={(e) => (e.key === "Enter" ? addTodo() : undefined)}
            />
          </div>
          <Tabs defaultValue="todo" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="todo">Pending ({pendingList.length})</TabsTrigger>
              <TabsTrigger value="done">Done</TabsTrigger>
            </TabsList>
            <TabsContent value="todo">
              <AnimatePresence>
                <Reorder.Group values={pendingList} onReorder={setPendingList} dragListener={false}>
                  {pendingList.map((todo: Todo) => (
                    <Reorder.Item
                      key={todo.id}
                      value={todo.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <Card className="mt-8">
                        <CardContent className="pt-6 pl-8 w-full">
                          <div className="flex items-center">
                            <Checkbox className="mr-6" onClick={() => completePendingTodo(todo.id)} />
                            <span>{todo.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="done">
              <AnimatePresence>
                <Reorder.Group values={doneList} onReorder={setDoneList} dragListener={false}>
                  {doneList.map((todo: Todo) => (
                    <Reorder.Item
                      key={todo.id}
                      value={todo.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <Card className="mt-8">
                        <CardContent className="pt-6 pl-8 w-full">
                          <div className="flex items-center">
                            <ListRestart
                              className="mr-6 h-5 w-5 text-gray-500"
                              onClick={() => recycleDoneTodo(todo.id)}
                            />
                            <span>{todo.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
