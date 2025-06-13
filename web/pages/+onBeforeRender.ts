// /pages/some-page/+onBeforeRender.js

import { BgImgUrlStore, ImageIdsStore } from "@/globalStore";
import type { PageContext } from "vike/types";

import { Cloudinary } from "@cloudinary/url-gen";
import { auto, scale } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const cloudName: string = process.env.CLOUDINARY_CLOUD_NAME ?? "test";

export async function onBeforeRender(pageContext: PageContext) {
	let currentPath = pageContext.urlPathname;
	const bgImgUrlStore = BgImgUrlStore.getInstance();

	const imgIdsStore = await ImageIdsStore.getInstance();
	const imgIds = imgIdsStore.getImgIds();
	const randomIndex = Math.floor(Math.random() * imgIds.length);

	const cld = new Cloudinary({ cloud: { cloudName } });

	// process plan
	if (currentPath.includes("/plan")) {
		currentPath = "/plan";
	}

	let imgId = bgImgUrlStore.getBgImgId();

	if (currentPath === "/") {
		imgId = imgIds[randomIndex];
		bgImgUrlStore.setBgImgId(imgId);
	}

	let img = cld
		.image(imgId)
		.format("auto")
		.resize(auto().gravity(autoGravity()));
	if (currentPath !== "/") {
		img = img.resize(scale().width(20));
	}

	const imgUrl = img.toURL();
	bgImgUrlStore.setBgImgUrl(imgUrl);

	return {
		pageContext: {
			routePath: currentPath,
			bgImgUrl: bgImgUrlStore.getBgImgUrl(),
		},
	};
}
