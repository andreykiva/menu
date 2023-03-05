import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditedArticle.module.css';
import Button from '../../UI/Button/Button';

const EditedArticle = ({ title, image, id, saveArticle, children }) => {
	const [articleTitle, setArticleTitle] = useState(title);
	const [articleText, setArticleText] = useState(children);
	const [articleImage, setArticleImage] = useState(image);
	const [displayImage, setDisplayImage] = useState(null);

	const editTitle = (e) => {
		setArticleTitle(e.target.innerText);
	};

	const editText = (e) => {
		setArticleText(e.target.innerText);
	};

	const uploadFile = (e) => {
		const [currentFile] = e.target.files;

		if (currentFile) {
			setArticleImage(currentFile);
			setDisplayImage(URL.createObjectURL(currentFile));
		}
	};

	return (
		<div className={styles.EditedArticle}>
			<h3
				className={styles.EditedArticleTitle}
				onBlur={editTitle}
				contentEditable
				suppressContentEditableWarning
			>
				{articleTitle}
			</h3>
			<div className={styles.EditedArticleImage}>
				<label className={styles.FileUpload}>
					<input type="file" accept="image/*" onChange={uploadFile} />
					Завантажити зображення
				</label>
				<img
					src={
						displayImage ||
						`http://localhost:8889/images/${
							articleImage ? 'articles/' + articleImage : 'default.png'
						}`
					}
					alt="Article Image"
				/>
			</div>
			<div
				className={styles.EditedArticleText}
				onBlur={editText}
				contentEditable
				suppressContentEditableWarning
			>
				{`${articleText}`}
			</div>
			<div className={styles.SaveArticle}>
				<Button
					onClick={saveArticle.bind(
						this,
						id,
						articleTitle,
						articleText,
						articleImage
					)}
				>
					Зберегти
				</Button>
			</div>
		</div>
	);
};

EditedArticle.propTypes = {
	title: PropTypes.string,
	image: PropTypes.string,
	id: PropTypes.string,
	saveArticle: PropTypes.func,
	children: PropTypes.string
};

export default EditedArticle;
