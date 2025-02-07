import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '../App.module.css';
import { useRequestDeleteTodo, useRequestUpdateTodo } from '../hooks';

export const Task = ({ todos, setTodos, isLoading }) => {
	const { requestUpdateTodo, isUpdating } = useRequestUpdateTodo(todos, setTodos);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(todos, setTodos);

	const { id } = useParams();
	const navigate = useNavigate();
	const task = todos.find((task) => task.id.toString() === id);

	useEffect(() => {
		if (!isLoading && todos.length > 0 && !task) {
			navigate('/404');
		}
	}, [task, isLoading, todos, navigate]);

	if (isLoading) {
		return <div className={styles.loader}></div>;
	}

	if (!task) {
		return <div>Задача не найдена</div>;
	}

	return (
		<div className={styles.taskPage}>
			<button className={styles.returnButton} onClick={() => navigate(-1)}>
				Назад
			</button>
			<h2 className={styles.todoItem}>{task.title}</h2>
			<button
				onClick={() => requestUpdateTodo(id, task.completed)}
				className={styles.updateButton}
				disabled={isUpdating}
			>
				{task.completed ? '✅' : '❌'}
			</button>

			<button
				className={styles.deleteButton}
				disabled={isDeleting}
				id={id}
				onClick={() => requestDeleteTodo(id)}
			>
				Удалить
			</button>
		</div>
	);
};
