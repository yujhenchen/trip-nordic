// /pages/some-page/+onBeforeRender.js

import { COUNTRY_BG_CLASSES } from "@/constants";
import { BgImgClassStore } from "@/globalStore";
import type { PageContext } from "vike/types";

export function onBeforeRender(pageContext: PageContext) {
	let currentPath = pageContext.urlPathname;
	const bgClassStore = BgImgClassStore.getInstance();

	// process plan
	if (currentPath.includes("/plan")) {
		currentPath = "/plan";
	}

	// get new image when at home
	if (currentPath === "/") {
		const randomBgClass =
			COUNTRY_BG_CLASSES[
			Math.floor(Math.random() * COUNTRY_BG_CLASSES.length)
			] ?? "";
		bgClassStore.setBgImgClass(randomBgClass);
	}

	return {
		pageContext: {
			routePath: currentPath,
			bgImgClass: bgClassStore.getBgImgClass(),
		},
	};
}
