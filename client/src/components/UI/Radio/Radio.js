import React from 'react';
import PropTypes from 'prop-types';
import styles from './Radio.module.css';

const Radio = ({ title, name, id, onChange, checked = false }) => {
	return (
		<div className={styles.Radio}>
			<input
				type="radio"
				id={id}
				name={name}
				onChange={onChange}
				checked={checked}
			/>
			<label htmlFor={id}>{title}</label>
		</div>
	);
};

Radio.propTypes = {
	title: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func,
	checked: PropTypes.bool
};

export default Radio;
