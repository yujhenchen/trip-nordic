// /pages/some-page/+onBeforeRender.js

import { COUNTRY_BG_CLASSES } from "@/constants";

export function onBeforeRender() {
	const pageType = "home";

	const randomIndex = Math.floor(Math.random() * COUNTRY_BG_CLASSES.length);
	const randomBgClass = COUNTRY_BG_CLASSES[randomIndex];

	return {
		pageContext: {
			pageType,
			randomBgClass,
		},
	};
}
