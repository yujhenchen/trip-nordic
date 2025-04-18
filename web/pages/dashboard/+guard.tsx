import { redirect } from "vike/abort";
import type { PageContext } from "vike/types";

// This guard() hook protects all pages /pages/admin/**/+Page.js

export async function guard(pageContext: PageContext) {
	if (!pageContext.user) {
		throw redirect("/");
	}
}
