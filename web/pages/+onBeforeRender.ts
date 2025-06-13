// /pages/some-page/+onBeforeRender.js

import { BgImgUrlStore, ImageIdsStore } from "@/globalStore";
import type { PageContext } from "vike/types";

import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const cloudName: string = process.env.CLOUDINARY_CLOUD_NAME ?? "test";

export async function onBeforeRender(pageContext: PageContext) {
	let currentPath = pageContext.urlPathname;
	const bgImgUrlStore = BgImgUrlStore.getInstance();

	const imgIdsStore = await ImageIdsStore.getInstance();
	const imgIds = imgIdsStore.getImgIds();
	const randomIndex = Math.floor(Math.random() * imgIds.length);

	const cld = new Cloudinary({ cloud: { cloudName } });

	// Use this sample image or upload your own via the Media Explorer
	const img = cld
		.image(imgIds[randomIndex])
		.format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
		.quality("auto")
		.resize(auto().gravity(autoGravity())); // Transform the image: auto-crop to square aspect_ratio

	const imgUrl = img.toURL();

	// process plan
	if (currentPath.includes("/plan")) {
		currentPath = "/plan";
	}

	// get new image when at home
	if (currentPath === "/") {
		bgImgUrlStore.setBgImgUrl(imgUrl);
	}

	return {
		pageContext: {
			routePath: currentPath,
			bgImgUrl: bgImgUrlStore.getBgImgUrl(),
		},
	};
}
