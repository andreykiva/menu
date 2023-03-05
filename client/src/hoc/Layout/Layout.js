import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import Navbar from '../../components/Navbar/Navbar';

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className={styles.Content}>{children}</main>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.any
}

export default Layout;
