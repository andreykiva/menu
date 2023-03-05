import React from 'react';
import styles from './Logo.module.css';
import petsLogo from '../../assets/icons/logo.svg';

const Logo = () => {
	return (
		<div className={styles.Logo}>
			<img src={petsLogo} alt="Pets Logo" />
		</div>
	);
};

export default Logo;
