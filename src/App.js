import styles from 'react';
import { useState } from 'react';
import './App.css';

export const App = () => {

  
  
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  const isValueValid = value.length >= 3;

  const formatDate = date => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(date).toLocaleString('ru-RU', options);
  };

  const onAddButtonClick = () => {
    if (isValueValid) {
      const id = list.length + 1; // уникальный id для нового элемента
      const createdAt = formatDate(new Date()); // получаем текущую дату и время
      setList(list => [...list, { id, value, createdAt }]); //используем updater-функцию
      setValue("");
      setError("");
      
    console.log(list, value, error);//checkup
    }
  }
  const onInputButtonClick = () => {
    const promptValue = prompt('Введите значение ');
    if (promptValue && promptValue.length >= 3) {
      setValue(promptValue);
      setError('');
    } else {
      setValue('');
      setError('Введенное значение должно содержать минимум 3 символа!');
    }
    
    console.log(`You entered ${promptValue}`);
  }

	return (
    <div className="app">
    <h1 className={styles['page-heading']}>Ввод значения</h1>
    <p className={styles['no-margin-text']}>
      Текущее значение <code>value</code>: "<output className="current-value">{value}</output>"
    </p>
    <div className="error">{error}</div>
    <div className={styles['buttons-container']}>
      <button className="button" onClick = {onInputButtonClick} >Ввести новое</button>
      <output>{value}</output>
      <button className="button" disabled={!isValueValid} onClick={onAddButtonClick}>Добавить в список</button>
    </div>
    <div className={styles['list-container']}>
      <h2 className={styles['list-heading']}>Список:</h2>
      
      {list.length > 0 ? (

        <ul className="list">{list.map(item => (
          <li className={styles['list-item']} key={item.id}>{item.value} - дата и время создания элемента :  ({item.createdAt})</li>
        ))}
        </ul>
      ) : (
        <p className={styles['no-margin-text']}>Нет добавленных элементов</p>
      )}
    </div>
  </div>
  );

	
};
