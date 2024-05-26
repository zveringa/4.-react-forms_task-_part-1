import styles from './app.module.css';
import { useState, useRef, useEffect } from 'react';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password_2, setPassword_2] = useState('');
	const [loginError, setLoginError] = useState(null);

	const submitButtonRef = useRef(null);

	useEffect(() => {
		submitButtonRef.current.focus();
	});

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		// if (!target.value) {
		// 	setLoginError('Введите e-mail!');
		// } else {
		// 	setLoginError(null);
		// }
	};
	const onEmailBlur = (target) => {
		setEmail(target.value);
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email.current)) {
			setLoginError('Неверный формат e-mail!');
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

		if (loginError === null && email && password === password_2) {
			submitButtonRef.current.focus();
		}
	};

	const onPasswordBlur = () => {
		if (password.length < 3) {
			setLoginError('Неверный логин. Должно быть не меньше 3 символов');
		}
	};

	const onPassword_2Blur = () => {
		if (password !== password_2) {
			setLoginError(
				'Повторный пароль не совпадает с первоначальным , повторите пароль',
			);
			// setPassword('');
			setPassword_2('');
		} else {
			setLoginError(null);
			sendFormData({ email, password });
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();

		//check-up
		console.log(
			`email: ${email}, password: ${password}, password_2: ${password_2}, loginError: ${loginError}`,
		);
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
					name="password_2"
					type="password"
					placeholder="Повторите Пароль"
					value={password_2}
					onChange={({ target }) => setPassword_2(target.value)}
					onBlur={onPassword_2Blur}
					required
				/>
				<button
					ref={submitButtonRef}
					type="submit"
					disabled={loginError !== null}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
