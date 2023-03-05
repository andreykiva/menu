import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './BackBtn.module.css';
import ArrowImg from '../../../assets/icons/right-arrow.svg';

const BackBtn = ({ url, children }) => {
	return (
		<Link to={url} className={styles.BackBtn}>
			<img src={ArrowImg} alt="Back" />
			<span>{children}</span>
		</Link>
	);
};

BackBtn.propTypes = {
	url: PropTypes.string,
	children: PropTypes.any
};

export default BackBtn;
