import { useState } from "react";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { CircleX } from "lucide-react";

interface Todo {
  id: string;
  name: string;
}

function App() {
  const [todo, setTodo] = useState<Todo>({ id: "", name: "" });
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = () => {
    if (todo.id) {
      setTodoList([todo, ...todoList]);
      setTodo({ id: "", name: "" });
    }
  };

  const deleteTodo = (id: string) => {
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
              placeholder="What would you like to do?"
              value={todo.name}
              onChange={(e) => setTodo({ id: Date.now().toString(), name: e.target.value })}
              onKeyDown={(e) => (e.key === "Enter" ? addTodo() : undefined)}
            />
          </div>
          {todoList.map((item) => (
            <Card id={item.id} className="mt-8">
              <CardContent className="pt-6 pl-8 w-full">
                {item.name}
                <CircleX
                  className="h-4 w-4 mt-1 float-right text-slate-400 hover:text-slate"
                  onClick={() => deleteTodo(item.id)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
