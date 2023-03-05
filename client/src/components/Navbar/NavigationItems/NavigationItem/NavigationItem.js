import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const NavigationItem = ({ children, link }) => {
	return (
		<li className={styles.NavigationItem}>
			<NavLink to={link}>{children}</NavLink>
		</li>
	);
};

NavigationItem.propTypes = {
	children: PropTypes.any,
	link: PropTypes.string
};

export default NavigationItem;
