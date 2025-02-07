import { useState } from 'react';

export const useRequestUpdateTodo = (todos, setTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateTodo = (todoId, isCompleted) => {
		setIsUpdating(true);

		fetch(`http://localhost:3003/todos/${todoId}`, {
			method: 'PATCH',
			headers: { 'Content-type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: !isCompleted,
			}),
		})
			.then((rawResponse) => rawResponse.json())

			.then((updatedTodo) => {
				setTodos((prevTodos) =>
					prevTodos.map((todo) =>
						todo.id === updatedTodo.id ? updatedTodo : todo,
					),
				);
			})
			.finally(() => setIsUpdating(false));
	};

	return {
		isUpdating,
		requestUpdateTodo,
	};
};
