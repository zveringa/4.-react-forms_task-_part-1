import styles from './app.module.css';
import { useState } from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [loginError, setLoginError] = useState(null);

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let newError = null;

		if (!/^[\w_]*$/.test(target.value)) {
			newError =
				'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание';
		} else if (target.value.length > 20) {
			newError = 'Неверный логин. Должно быть не больше 20 символов';
		}

		setLoginError(newError);
	};

	const onPasswordBlur = () => {
		if (password.length < 3) {
			setLoginError('Неверный логин. Должно быть не menьше 3 символов');
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		// sendFormData({ email, password });
		console.log(email, password);
	};

	// 'Повторный пароль не совпадает с первоначальным , повторите пароль'

	return (
		<div className={styles.app}>
			{loginError && <div className={styles.error}>{loginError}</div>}
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
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				<input
					name="password2"
					type="password"
					placeholder="Повторите Пароль"
					value={password2}
					onChange={({ target }) => setPassword2(target.value)}
				/>
				<button type="submit" disabled={loginError !== null}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
