// /pages/some-page/+onBeforeRender.js

import { COUNTRY_BG_CLASSES } from "@/constants";

export function onBeforeRender() {
	const pageType = "home";

	// TODO: use this once setup CDN
	// const randomIndex = Math.floor(Math.random() * COUNTRY_BG_CLASSES.length);
	// const randomBgClass = COUNTRY_BG_CLASSES[randomIndex];
	const randomBgClass = "bg-[url('/assets/fi.jpg')]";

	return {
		pageContext: {
			pageType,
			randomBgClass,
		},
	};
}
