import type { PageType } from "./shared";

declare global {
	namespace Vike {
		interface PageContext {
			// Type of pageContext.user
			user?: string;
			// Refine type of pageContext.Page (it's `unknown` by default)
			pageType: PageType;
			// Type of pageContext.bgImgClass
			bgImgClass: string;
			Page: () => React.JSX.Element;
		}
	}
}
