import { INewsItem } from '../../types/INewsItem';
import NewsItem from './NewsItem';

interface IProps {
	news: INewsItem[];
	deleteNews(id: number): void;
	editNews(updatedNews: INewsItem): void;
}

export default function NewsList({ news, deleteNews, editNews }: IProps) {
	return (
		<div className='news-list'>
			{news.map((newsItem) => (
				<NewsItem
					key={newsItem.id}
					deleteNews={deleteNews}
					editNews={editNews}
					newsItem={newsItem}
				/>
			))}
		</div>
	);
}
