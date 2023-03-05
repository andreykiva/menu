import React from 'react';
import PropTypes from 'prop-types';
import styles from './PetItem.module.css';
import { Link } from 'react-router-dom';
import CatImg from '../../../assets/images/cat.png';
import DogImg from '../../../assets/images/dog.png';

const PetItem = ({ title, url, type }) => {
	const cls = [styles.PetItem, styles[type]];

	return (
		<Link to={url} className={cls.join(' ')}>
			<img src={type === 'cats' ? CatImg : DogImg} alt={title} />
			<div className={styles.ItemContent}>
				<button className={styles.ItemBtn}>{title}</button>
			</div>
		</Link>
	);
};

PetItem.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string,
	type: PropTypes.string
};

export default PetItem;
