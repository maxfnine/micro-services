import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const url = "https://jsonplaceholder.typicode.com/todos/1";
axios
  .get(url)
  .then((response) => {
    const todo = response.data as Todo;
    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;
    logTodo(id, title, completed);
  })
  .catch((err) => {
    console.log(err);
  });

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`
    The Todo with ID: ${id}
    Has a title of: ${title}
    Is finished: ${completed}
    `);
};
