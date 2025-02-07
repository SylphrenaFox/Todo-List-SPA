import React from 'react';
import { useState } from 'react';
import styles from './App.module.css';

import { MainPage } from './components/MainPage';
import { Task } from './components/Task';
import { NotFound } from './components/NotFound';
import { Routes, Route } from 'react-router-dom';
import {
	useRequestGetTodos,
	useRequestAddTodo,
	useRequestUpdateTodo,
	useRequestDeleteTodo,
} from './hooks';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [todoItem, setTodoItem] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [isSortTurnedOn, setIsSortTurnedOn] = useState(false);

	const { isLoading } = useRequestGetTodos(todos, setTodos);
	const { requestAddTodo, isCreating } = useRequestAddTodo(todos, setTodos);
	const { requestUpdateTodo, isUpdating } = useRequestUpdateTodo(todos, setTodos);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(todos, setTodos);

	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={
						<MainPage
							todoItem={todoItem}
							setTodoItem={setTodoItem}
							isCreating={isCreating}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							isSortTurnedOn={isSortTurnedOn}
							setIsSortTurnedOn={setIsSortTurnedOn}
							isLoading={isLoading}
							requestAddTodo={requestAddTodo}
							todos={todos}
						/>
					}
				/>
				<Route
					path="/task/:id"
					element={
						<Task
							todos={todos}
							requestUpdateTodo={requestUpdateTodo}
							requestDeleteTodo={requestDeleteTodo}
							isUpdating={isUpdating}
							isDeleting={isDeleting}
							isLoading={isLoading}
						/>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};
