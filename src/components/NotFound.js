import { useNavigate } from 'react-router-dom';
import styles from '../App.module.css';

export const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.notFound}>
			<div>Задача не найдена</div>
			<button className={styles.button} onClick={() => navigate(`/`)}>
				Вернуться на главную страницу
			</button>
		</div>
	);
};
