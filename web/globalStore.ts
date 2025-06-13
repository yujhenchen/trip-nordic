import { getAssetsPublicIds } from "./cloudinary";

export class BgImgUrlStore {
	private bgImgUrl = "";
	private static instance: BgImgUrlStore;

	private constructor() {}

	public static getInstance(): BgImgUrlStore {
		if (!BgImgUrlStore.instance) {
			BgImgUrlStore.instance = new BgImgUrlStore();
		}
		return BgImgUrlStore.instance;
	}

	public getBgImgUrl(): string {
		return this.bgImgUrl;
	}

	public setBgImgUrl(imgUrl: string): void {
		this.bgImgUrl = imgUrl;
	}
}

const imgPrefix: string = process.env.CLOUDINARY_IMAGE_PREFIX ?? "img_prefix";

export class ImageIdsStore {
	private static instance: ImageIdsStore;
	private imgIds: Array<string> = [];

	private constructor() {}

	private async init(): Promise<void> {
		try {
			const imgIds = await getAssetsPublicIds({ prefix: imgPrefix });
			this.imgIds = imgIds;
		} catch (error) {
			console.error(error);
			this.imgIds = [];
		}
	}

	public static async getInstance(): Promise<ImageIdsStore> {
		if (!ImageIdsStore.instance) {
			ImageIdsStore.instance = new ImageIdsStore();
			await ImageIdsStore.instance.init();
		}
		return ImageIdsStore.instance;
	}

	public getImgIds(): Array<string> {
		return this.imgIds;
	}
}
