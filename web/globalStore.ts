import { initBgImages } from "./utils/assetsHelper";

export class BgImgStore {
	private static instance: BgImgStore;
	private imgIds: Array<string> = [];
	private imgUrlMap: Map<string, { default: string; small: string }> =
		new Map();

	private currentImgId = "";

	private constructor() {}

	public static async getInstance(
		cloudName: string,
		imgPrefix: string,
	): Promise<BgImgStore> {
		if (!BgImgStore.instance) {
			BgImgStore.instance = new BgImgStore();
		}
		if (BgImgStore.instance.imgIds.length === 0) {
			await initBgImages(cloudName, imgPrefix, BgImgStore.instance);
		}
		return BgImgStore.instance;
	}

	public setImgIds(imgIds: Array<string>): void {
		this.imgIds = imgIds;
	}

	public getImgIds(): Array<string> {
		return this.imgIds;
	}

	public setImgUrlMap(
		imgUrlMap: Map<string, { default: string; small: string }>,
	): void {
		this.imgUrlMap = imgUrlMap;
	}

	public getImgUrlMap(): Map<string, { default: string; small: string }> {
		return this.imgUrlMap;
	}

	public getItemFromImgUrlMap(
		imgId: string,
	): { default: string; small: string } | undefined {
		return this.imgUrlMap.get(imgId);
	}

	public setCurrentImgId(imgId: string): void {
		this.currentImgId = imgId;
	}

	public getCurrentImgId(): string {
		return this.currentImgId;
	}
}
