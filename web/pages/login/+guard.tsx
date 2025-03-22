import type { AppPageContext } from "@/types/pageContext";
import { redirect } from "vike/abort";

// This guard() hook protects all pages /pages/admin/**/+Page.js

export async function guard(pageContext: AppPageContext) {
	if (pageContext.user) {
		throw redirect("/");
	}
}
