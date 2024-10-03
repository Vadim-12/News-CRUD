import { File } from './File';

export type CreateNewsDto = {
	title: string;
	textContent: string;
	images?: File[];
};
