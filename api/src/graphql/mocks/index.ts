export interface ITodo {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  userId: number
}

const users = [
  {
    id: '1',
    name: 'Luis',
    email: 'lg@email.com',
    password: "123456",
    todos: [1, 2]
  },
  {
    id: '2',
    name: 'John',
    email: "jj@email.com",
    password: "123456",
    todos: [3]
  }
];

const todos = [
  {
    id: '1',
    title: 'Limpar a casa',
    description: 'Descrição Todo aqui...',
    completed: false,
    userId: 1,
  },
  {
    id: '2',
    title: 'Trabalho faculdade',
    description: 'Descrição Todo aqui...',
    completed: false,
    userId: 1,
  },
  {
    id: '3',
    title: 'Lavar a roupa',
    description: 'Descrição Todo aqui...',
    completed: false,
    userId: 2,
  }
];

export { todos, users }