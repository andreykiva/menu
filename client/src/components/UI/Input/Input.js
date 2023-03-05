import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = ({ type, name, placeholder, value, error = '', onChange }) => {
	const cls = [styles.Input, error && styles.Invalid];

	return (
		<div className={styles.InputWr}>
			<input
				className={cls.join(' ')}
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{error && <span className={styles.InputError}>{error}</span>}
		</div>
	);
};

Input.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func
};

export default Input;
