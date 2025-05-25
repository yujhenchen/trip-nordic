export class BgImgClassStore {
	private bgImgClass = "";
	private static instance: BgImgClassStore;

	private constructor() { }

	public static getInstance(): BgImgClassStore {
		if (!BgImgClassStore.instance) {
			BgImgClassStore.instance = new BgImgClassStore();
		}
		return BgImgClassStore.instance;
	}

	public getBgImgClass(): string {
		return this.bgImgClass;
	}

	public setBgImgClass(bgImgClass: string): void {
		this.bgImgClass = bgImgClass;
	}
}
