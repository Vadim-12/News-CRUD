import { useEffect, useState } from 'react';
import NewsCreator from './components/NewsCreator';
import NewsList from './components/NewsList';
import { INewsItem } from './types/INewsItem';
import { storageService } from './services/storageService';
import { LS_DATA_ACCESS_KEY } from './constants/lsKeys';

function App() {
	const [news, setNews] = useState<INewsItem[]>([]);

	const fetchNews = () => {
		const newsFromStorage = storageService.getAllNews();
		setNews(newsFromStorage);
	};

	useEffect(() => {
		fetchNews();

		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === LS_DATA_ACCESS_KEY) {
				fetchNews();
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	const addNews = (newItem: INewsItem) => {
		setNews((prevNews) => [...prevNews, newItem]);
		storageService.createNews(newItem);
	};

	const deleteNews = (id: number) => {
		setNews((prevNews) => prevNews.filter((newsItem) => newsItem.id !== id));
		storageService.deleteNews(id);
	};

	const editNews = (editedNews: INewsItem) => {
		setNews((prevNews) =>
			prevNews.map((newsItem) =>
				newsItem.id === editedNews.id ? editedNews : newsItem
			)
		);
		storageService.editNews(editedNews);
	};

	return (
		<>
			<h1>Новости</h1>
			<NewsCreator addNews={addNews} />
			<NewsList news={news} deleteNews={deleteNews} editNews={editNews} />
		</>
	);
}

export default App;
