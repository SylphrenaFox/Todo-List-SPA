import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { debounce } from '../utils/debounce';
import styles from '../App.module.css';
import { useRequestGetTodos, useRequestAddTodo } from '../hooks';

export const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [todoItem, setTodoItem] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [isSortTurnedOn, setIsSortTurnedOn] = useState(false);

	const { isLoading } = useRequestGetTodos(todos, setTodos);
	const { requestAddTodo, isCreating } = useRequestAddTodo(todos, setTodos);

	const handleSubmitButton = (event) => {
		event.preventDefault();
		requestAddTodo(todoItem);
		setTodoItem('');
	};

	const filteredTodos = todos.filter((todo) =>
		todo.title?.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const sortedTodos = isSortTurnedOn
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	const debouncedSearchChange = debounce((value) => {
		setSearchQuery(value);
	}, 250);

	const handleSearchChange = ({ target }) => {
		debouncedSearchChange(target.value);
	};

	return (
		<div className={styles.app}>
			<button
				className={styles.sortButton}
				onClick={() => setIsSortTurnedOn(!isSortTurnedOn)}
			>
				{isSortTurnedOn ? 'Отменить сортировку' : 'Сортировать'}
			</button>
			<form onSubmit={handleSubmitButton}>
				<input
					className={styles.todoInput}
					type="text"
					value={todoItem}
					placeholder="Введите задачу"
					onChange={({ target }) => setTodoItem(target.value)}
				/>
				<button
					type="submit"
					className={styles.submitButton}
					disabled={isCreating}
				>
					Создать задачу
				</button>
			</form>
			<input
				type="text"
				className={styles.searchInput}
				placeholder="Поиск задачи"
				value={searchQuery}
				onChange={handleSearchChange}
			/>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				sortedTodos.map(({ id, title, completed }) => (
					<div key={id} className={styles.todoItem}>
						<Link to={`/task/${id}`}>{title}</Link>
					</div>
				))
			)}
		</div>
	);
};
