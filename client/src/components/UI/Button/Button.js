import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, children }) => {
	return (
		<button className={styles.Button} onClick={onClick}>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.any,
	onClick: PropTypes.func
};

export default Button;
