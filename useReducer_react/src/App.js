import { useReducer, useState } from 'react';
import './App.css';
import Todo from "./Todo";

export const ACTIONS = {
	ADD_TODO: "ADD_TODO",
	DELETE_TODO: "DELETE_TODO",
	TOGGLE_TODO: "TOGGLE_TODO"
}

const reducer = (todos, action) => {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			return [...todos, action.payload.todo];
		case ACTIONS.DELETE_TODO:
			return todos.filter((item, id) => id !== action.payload.id);
		case ACTIONS.TOGGLE_TODO:
			return todos.map((item, id) => id === action.payload.id ? { ...item, completed: !item.completed } : item);
		default:
			return todos;
	}
}


const newTodo = (name) => {
	return { date: Date.now(), name, completed: false }
}


function App() {

	const [todos, dispatch] = useReducer(reducer, []);
	const [name, setName] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		dispatch({ type: ACTIONS.ADD_TODO, payload: { todo: newTodo(name) } })
		setName("")
		console.log(todos)
	}

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<input value={name} onChange={e => setName(e.target.value)} />
			</form>

			{todos.map((item, id) => {
				return (
					<Todo item={item} id={id} dispatch={dispatch} />
				)
			})}

		</div>
	);
}

export default App;
