import React, { useContext } from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { AuthContext } from '../../../context/auth/authContext';

const NavigationItems = () => {
	const { isAuthenticated } = useContext(AuthContext);

	let links = [
		{
			title: 'Головна',
			to: '/'
		},
		{
			title: 'Статті',
			to: '/articles'
		},
		{
			title: 'Вийти',
			to: '/logout'
		}
	];

	if (!isAuthenticated) {
		links = [
			{
				title: 'Вхід',
				to: '/login'
			},
			{
				title: 'Реєстрація',
				to: '/register'
			}
		];
	}

	return (
		<ul className={styles.NavigationItems}>
			{links.map((link, i) => (
				<NavigationItem key={i} link={link.to}>
					{link.title}
				</NavigationItem>
			))}
		</ul>
	);
};

export default NavigationItems;
