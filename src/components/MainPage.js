import React from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../utils/debounce';
import styles from '../App.module.css';

export const MainPage = ({
	todoItem,
	setTodoItem,
	isCreating,
	searchQuery,
	isSortTurnedOn,
	setIsSortTurnedOn,
	setSearchQuery,
	requestAddTodo,
	todos,
}) => {
	const navigate = useNavigate();

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
			{sortedTodos.map(({ id, title }) => (
				<div
					key={id}
					className={styles.todoItem}
					onClick={() => navigate(`/task/${id}`)}
				>
					{title}
				</div>
			))}
		</div>
	);
};
