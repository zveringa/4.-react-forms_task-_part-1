import styles from './App.module.css';
import { useState } from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ email, password });
	};
	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="e-mail"
					value={email}
					onChange={({ target }) => setEmail(target.value)}
				/>
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
				<input
					name="password2"
					type="password"
					placeholder="Povtorite Пароль"
					value={password2}
					onChange={({ target }) => setPassword2(target.value)}
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
