import { File } from './File';

export interface INewsItem {
	id: number;
	title: string;
	textContent: string;
	images?: File[];
}
