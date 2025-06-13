// /pages/some-page/+onBeforeRender.js

import { BgImgUrlStore } from "@/globalStore";
import type { PageContext } from "vike/types";

import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const cloudName: string = process.env.CLOUDINARY_CLOUD_NAME ?? "test";

export function onBeforeRender(pageContext: PageContext) {
	let currentPath = pageContext.urlPathname;
	const bgClassStore = BgImgUrlStore.getInstance();

	// TODO: use API key to secure
	const cld = new Cloudinary({ cloud: { cloudName } });

	// Use this sample image or upload your own via the Media Explorer
	// TODO: random get images from Cloudinary instance
	const img = cld
		.image("se-3_slai5b")
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
		const bgClass = imgUrl;
		bgClassStore.setBgImgUrl(bgClass);
	}

	return {
		pageContext: {
			routePath: currentPath,
			bgImgUrl: bgClassStore.getBgImgUrl(),
		},
	};
}
