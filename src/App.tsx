import { useState } from "react";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { AnimatePresence, Reorder } from "framer-motion";
import { Checkbox } from "./components/ui/checkbox";

interface Todo {
  id: string;
  name: string;
  isDone: boolean;
}

function App() {
  const [todo, setTodo] = useState<Todo>({ id: "", name: "", isDone: false });
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = () => {
    if (todo.id) {
      setTodoList([todo, ...todoList]);
      setTodo({ id: "", name: "", isDone: true });
    }
  };

  const completeTodo = async (id: string) => {
    const filteredList = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredList);
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
          <AnimatePresence>
            <Reorder.Group values={todoList} onReorder={setTodoList} dragListener={false}>
              {todoList.map((todo: Todo) => (
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
                        <Checkbox className="mr-6" onClick={() => completeTodo(todo.id)} />
                        <span>{todo.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </AnimatePresence>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
