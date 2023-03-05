import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Article.module.css';
import Title from '../../UI/Title/Title';
import DeleteImg from '../../../assets/icons/delete.svg';
import EditImg from '../../../assets/icons/edit.svg';

const Article = ({
	title,
	image,
	id,
	isAdmin,
	deleteArticle,
	startEditArticle,
	children
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleArticleText = () => {
		setIsOpen(!isOpen);
	};

	const adminButtons = (
		<div className={styles.AdminButtons}>
			<button
				className={styles.AdminButton}
				onClick={startEditArticle.bind(this, id)}
			>
				<img src={EditImg} className={styles.AdminButtonImg} alt="Змінити" />
			</button>
			<button className={styles.AdminButton} onClick={deleteArticle.bind(this, id)}>
				<img src={DeleteImg} className={styles.AdminButtonImg} alt="Видалити" />
			</button>
		</div>
	);

	return (
		<div
			className={[styles.Article, isOpen ? styles.Opened : styles.Closed].join(' ')}
		>
			<Title tag="h3" color="red">
				{title}
			</Title>
			<div className={styles.ArticleContent}>
				<div className={styles.ArticleImage}>
					<img
						src={`http://localhost:8889/images/articles/${image}`}
						alt={image}
					/>
				</div>
				<p className={styles.ArticleText}>{children}</p>
			</div>
			<button className={styles.ArticleMoreBtn} onClick={toggleArticleText}>
				{isOpen ? 'Згорнути' : 'Розгорнути'}{' '}
			</button>
			{isAdmin && adminButtons}
		</div>
	);
};

Article.propTypes = {
	title: PropTypes.string,
	image: PropTypes.string,
	id: PropTypes.string,
	isAdmin: PropTypes.bool,
	deleteArticle: PropTypes.func,
	startEditArticle: PropTypes.func,
	children: PropTypes.any
};

export default Article;
