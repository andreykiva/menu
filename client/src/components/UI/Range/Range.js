import React from 'react';
import PropTypes from 'prop-types';
import styles from './Range.module.css';

const Range = ({ title, name, id, min, max, value, displayValue, onChange }) => {
	return (
		<div className={styles.Range}>
			<div className={styles.RangeInfo}>
				<label className={styles.RangeTitle} htmlFor={id}>
					{title}
				</label>
				<span>{displayValue}</span>
			</div>
			<input
				type="range"
				className={styles.RangeInput}
				id={id}
				name={name}
				min={min}
				max={max}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

Range.propTypes = {
	title: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	value: PropTypes.number,
	displayValue: PropTypes.string,
	onChange: PropTypes.func
};

export default Range;
