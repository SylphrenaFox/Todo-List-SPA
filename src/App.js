import React from 'react';
import styles from './App.module.css';
import { MainPage } from './components/MainPage';
import { Task } from './components/Task';
import { NotFound } from './components/NotFound';
import { Routes, Route } from 'react-router-dom';

export const App = () => {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/task/:id" element={<Task />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};
