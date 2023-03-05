import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.module.css';

const Title = ({ tag, color = 'black', children }) => {
	const cls = [styles[tag], styles[color]];
	switch (tag) {
		case 'h1':
			return <h1 className={cls.join(' ')}>{children}</h1>;
		case 'h2':
			return <h2 className={cls.join(' ')}>{children}</h2>;
		case 'h3':
			return <h3 className={cls.join(' ')}>{children}</h3>;
		case 'h4':
			return <h4 className={cls.join(' ')}>{children}</h4>;
		default:
			return <>{children}</>;
	}
};

Title.propTypes = {
	tag: PropTypes.string,
	color: PropTypes.string,
	children: PropTypes.any
};

export default Title;
