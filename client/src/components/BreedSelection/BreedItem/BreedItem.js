import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './BreedItem.module.css';

const BreedItem = ({ img, title, kind, breadId }) => {
	return (
		<Link to={`/pets/${kind}/${breadId}`} className={styles.BreedItem}>
			<div className={styles.ItemBack}></div>
			<img src={'http://localhost:8889/images/' + img} alt={title} />
			<span className={styles.ItemTitle}>{title}</span>
		</Link>
	);
};

BreedItem.propTypes = {
	img: PropTypes.string,
	title: PropTypes.string,
	kind: PropTypes.string,
	breadId: PropTypes.string
};

export default BreedItem;
