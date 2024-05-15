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

	const onEmailChange = ({ target }) => {
		const emailValue = target.value;
		setEmail(emailValue);

		if (!emailValue) {
			setLoginError('Введите e-mail!');
		} else {
			setLoginError(null);
		}
	};
	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let newError = null;

		if (!/^[\w_]*$/.test(target.value)) {
			newError =
				'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание';
		} else if (target.value.length > 10) {
			newError = 'Неверный логин. Должно быть не больше 10 символов';
		}

		setLoginError(newError);
	};
	const onEmailBlur = () => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			setLoginError('Неверный формат e-mail!');
		}
	};
	const onPasswordBlur = () => {
		if (password.length < 3) {
			setLoginError('Неверный логин. Должно быть не меньше 3 символов');
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();

		if (!email) {
			setLoginError('Введите e-mail!');
			return;
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			setLoginError('Неверный формат e-mail!');
			return;
		}

		if (password !== password2) {
			setLoginError(
				'Повторный пароль не совпадает с первоначальным , повторите пароль',
			);
			setPassword('');
			setPassword2('');
		} else {
			setLoginError(null);
			sendFormData({ email, password });
		}

		console.log(email, password);
	};

	return (
		<div className={styles.app}>
			{loginError && <div className={styles.error}>{loginError}</div>}
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="e-mail"
					value={email}
					onChange={onEmailChange}
					onBlur={onEmailBlur}
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
					required
				/>
				<input
					name="password2"
					type="password"
					placeholder="Повторите Пароль"
					value={password2}
					onChange={({ target }) => setPassword2(target.value)}
					required
				/>
				<button type="submit" disabled={loginError !== null}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
