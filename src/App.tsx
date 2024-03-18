import { useState } from 'react'
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { CircleXIcon } from 'lucide-react';

interface Todo {
  id: string;
  name: string;
}

function App() {
  const [todo, setTodo] = useState<Todo>({id: '', name: ''});
  const [todoList, setTodoList] = useState<Todo []>([])

  const addTodo = () => {
    setTodoList([...todoList, todo])
  }

  const deleteTodo = (id: string) => {
    const filteredList = todoList.filter(todo => todo.id !== id)
    setTodoList(filteredList)
  }

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <Input className="w-1/4" value={todo.name} onChange={(e) => setTodo({id: todoList.length.toString(), name: e.target.value})} />
        <Button className="ml-4" onClick={() => addTodo()}> + </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">

      <div></div>
      <div>
      {
        todoList.map((item) => (
          <Card id = {item.id} className="mt-8">
            <CardContent className="pt-6 pl-12 w-full">
              {item.name}
              <CircleXIcon className="h-4 w-4 mt-1 float-right" onClick={() => deleteTodo(item.id)}/>
            </CardContent>
          </Card>
        ))
      }
      </div>
      <div></div>
      </div>
    </div>
  )
}

export default App
