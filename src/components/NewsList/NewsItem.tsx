import { INewsItem } from '../../types/INewsItem';
import styles from './styles.module.scss';
import deleteIcon from '../../assets/delete-icon.svg';
import editIcon from '../../assets/edit-icon.png';
import saveIcon from '../../assets/save-icon.svg';
import { useState } from 'react';

interface IProps {
	newsItem: INewsItem;
	deleteNews(id: number): void;
	editNews(editedNews: INewsItem): void;
}

function NewsItem({
	newsItem: { id, title, textContent, images = [] },
	deleteNews,
	editNews,
}: IProps) {
	const [isEditMode, setIsEditMode] = useState(false);
	const [editNewsData, setEditNewsData] = useState({
		id,
		title,
		textContent,
		images,
	});

	const imagesContent = images.map((image) => (
		<img key={image} src={image} alt='Изображение' />
	));

	return (
		<div className={styles['news-item']}>
			{isEditMode ? (
				<div className={styles['news-input-field']}>
					<label>Заголовок новости</label>
					<input
						type='text'
						value={editNewsData.title}
						onChange={(e) =>
							setEditNewsData((prev) => ({ ...prev, title: e.target.value }))
						}
					/>
				</div>
			) : (
				<h3>{title}</h3>
			)}
			{isEditMode ? (
				<div className={styles['news-input-field']}>
					<label>Текст новости</label>
					<textarea
						value={editNewsData.textContent}
						onChange={(e) =>
							setEditNewsData((prev) => ({
								...prev,
								textContent: e.target.value,
							}))
						}
					/>
				</div>
			) : (
				<p>{textContent}</p>
			)}
			<div className={styles['news-images']}>{imagesContent}</div>
			<div className={styles['news-btns']}>
				{isEditMode ? (
					<button
						onClick={() => {
							editNews(editNewsData);
							setIsEditMode(false);
						}}
					>
						<img src={saveIcon} alt='Сохранить изменения' />
						Сохранить
					</button>
				) : (
					<button onClick={() => setIsEditMode(true)}>
						<img src={editIcon} alt='Редактировать новость' />
						Редактировать
					</button>
				)}
				<button onClick={() => deleteNews(id)}>
					<img src={deleteIcon} alt='Удалить новость' />
					Удалить
				</button>
			</div>
		</div>
	);
}

export default NewsItem;
