import React from 'react';
import styles from './Navbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';

const Navbar = () => {
	return (
		<header className={styles.Navbar}>
			<Logo />
			<nav className={styles.Nav}>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default Navbar;
