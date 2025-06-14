// /pages/some-page/+onBeforeRender.js

import { BgImgStore } from "@/globalStore";
import type { PageContext } from "vike/types";

const cloudName: string = process.env.CLOUDINARY_CLOUD_NAME ?? "test";
const imgPrefix: string = process.env.CLOUDINARY_IMAGE_PREFIX ?? "img_prefix";

const fallbackImgUrl = "/assets/fi.jpg";

export async function onBeforeRender(pageContext: PageContext) {
	let currentPath = pageContext.urlPathname;

	const storeInstance = await BgImgStore.getInstance(cloudName, imgPrefix);
	const isHome = currentPath === "/";

	if (currentPath.includes("/plan")) {
		currentPath = "/plan";
	}

	let imgId = "";
	if (isHome) {
		const imgIdCount = storeInstance.getImgIds().length;
		const randomIdx = Math.floor(Math.random() * imgIdCount);
		imgId = storeInstance.getImgIds()[randomIdx];
		storeInstance.setCurrentImgId(imgId);
	}

	imgId = storeInstance.getCurrentImgId();
	const imgUrlItem = storeInstance.getItemFromImgUrlMap(imgId);

	return {
		pageContext: {
			routePath: currentPath,
			bgImgUrl: isHome
				? (imgUrlItem?.default ?? fallbackImgUrl)
				: (imgUrlItem?.small ?? fallbackImgUrl),
		},
	};
}
