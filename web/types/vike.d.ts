declare global {
	namespace Vike {
		interface PageContext {
			// Type of pageContext.user
			user?: string;
			// Refine type of pageContext.Page (it's `unknown` by default)
			routePath: string;
			// Type of pageContext.bgImgUrl
			bgImgUrl: string;
			Page: () => React.JSX.Element;
		}
	}
}

export {};
