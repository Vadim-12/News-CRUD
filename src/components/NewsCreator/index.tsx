import { useRef, useState } from 'react';
import styles from './styles.module.scss';
import { INewsItem } from '../../types/INewsItem';

interface IProps {
	addNews: (newsItem: INewsItem) => void;
}

export default function NewsCreator({ addNews }: IProps) {
	const [title, setTitle] = useState('');
	const [textContent, setTextContent] = useState('');
	const [images, setImages] = useState<any[]>([]);
	const imagesInputRef = useRef<HTMLInputElement>(null);

	const allowSubmit = Boolean(title && textContent);

	const handleSelectFiles: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const selectedFiles = e.target.files;
		if (!selectedFiles) {
			return;
		}

		for (let file of selectedFiles) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				const base64data = reader.result;
				setImages((prevImages) => [...prevImages, base64data]);
			};
		}
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!allowSubmit) {
			return;
		}

		const newPost = {
			id: Date.now(),
			title,
			textContent,
			images,
		};
		addNews(newPost);

		setTitle('');
		setTextContent('');
		if (imagesInputRef.current) {
			imagesInputRef.current.value = '';
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles['news-creator-form']}>
			<div className={styles['field-item']}>
				<label>Заголовок новости</label>
				<input
					type='text'
					placeholder='Введите заголовок новости...'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className={styles['field-item']}>
				<label>Текст новости</label>
				<textarea
					placeholder='Введите текстовый контент новости...'
					value={textContent}
					onChange={(e) => setTextContent(e.target.value)}
				/>
			</div>
			<div className={styles['field-item']}>
				<label>Изображения</label>
				<input
					type='file'
					accept='.png, .jpg, .jpeg, .svg, .gif'
					multiple
					onChange={handleSelectFiles}
					ref={imagesInputRef}
				/>
			</div>
			<button type='submit' disabled={!allowSubmit}>
				Создать
			</button>
		</form>
	);
}
