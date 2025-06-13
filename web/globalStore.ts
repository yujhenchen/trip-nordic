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
