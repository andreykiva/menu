import React from "react";
import PropTypes from "prop-types";
import styles from "./TextArea.module.css";

const TextArea = ({ placeholder, value, error = "", onChange }) => {
	const cls = [styles.TextArea, error && styles.Invalid];

	return (
		<div className={styles.TextAreaWr}>
			<textarea
				className={cls.join(" ")}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			></textarea>
			{error && <span className={styles.TextAreaError}>{error}</span>}
		</div>
	);
};

TextArea.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func,
};

export default TextArea;
