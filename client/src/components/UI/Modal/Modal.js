import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import CloseImg from '../../../assets/icons/close.svg';

const Modal = ({ children, closeModal, opened }) => {
	const overlayCls = [styles.Overlay, opened ? styles.Open : styles.Close];
	const modalCls = [styles.Modal, opened ? styles.Open : styles.Close];

	return (
		<>
			<div className={overlayCls.join(' ')} onClick={closeModal}></div>
			<div className={modalCls.join(' ')}>
				<span className={styles.ModalCloseBtn} onClick={closeModal}>
					<img src={CloseImg} alt="close" />
				</span>
				{children}
			</div>
		</>
	);
};

Modal.propTypes = {
	children: PropTypes.any,
	closeModal: PropTypes.func,
	opened: PropTypes.bool
};

export default Modal;
