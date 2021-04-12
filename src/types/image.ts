export interface Asset {
	url: string;
	title: string;
	description: string;
	contentType: string;
	fileName: string;
	size: number;
	width: number;
	height: number;
}

export interface AssetEntry {
	fields: {
		file: Record<string, Asset>;
		description: string;
		title: string;
	};
}
