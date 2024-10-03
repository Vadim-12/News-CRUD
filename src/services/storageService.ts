import { LS_DATA_ACCESS_KEY } from '../constants/lsKeys';
import { CreateNewsDto } from '../types/CreateNewsDto';
import { INewsItem } from '../types/INewsItem';
import { getRandomNumber } from '../utils/common';

class StorageService {
	dataAccessorKey: string = '';

	constructor(dataAccessorKey: string) {
		this.dataAccessorKey = dataAccessorKey;
	}

	getAllNews(): INewsItem[] {
		let result: INewsItem[] = [];
		try {
			const stringData = localStorage.getItem(this.dataAccessorKey);
			const jsonData = JSON.parse(stringData ?? '[]') as INewsItem[];
			result = jsonData;
		} catch (e) {
			console.error('ERROR', e);
			result = [];
		}
		return result;
	}

	saveNews(updatedNews: INewsItem[]) {
		localStorage.setItem(this.dataAccessorKey, JSON.stringify(updatedNews));
	}

	createNews({ title, textContent, images }: CreateNewsDto) {
		const allNews = this.getAllNews();
		const createdNews: INewsItem = {
			id: getRandomNumber(),
			title,
			textContent,
			images,
		};
		const updatedNews = allNews.concat(createdNews);
		this.saveNews(updatedNews);
	}

	deleteNews(id: number) {
		const allNews = this.getAllNews();
		const updatedNews = allNews.filter((newsItem) => newsItem.id !== id);
		this.saveNews(updatedNews);
	}

	editNews(updatedNewsItem: INewsItem) {
		const allNews = this.getAllNews();
		const updatedNews = allNews.map((newsItem) =>
			newsItem.id === updatedNewsItem.id ? updatedNewsItem : newsItem
		);
		this.saveNews(updatedNews);
	}
}

export const storageService = new StorageService(LS_DATA_ACCESS_KEY);
