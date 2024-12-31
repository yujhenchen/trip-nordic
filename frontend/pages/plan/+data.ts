import { PageContextServer } from "vike/types";

export type Data = {
    plan: { name: string }[];
}

export default async function data(_pageContext: PageContextServer): Promise<Data> {
    return { plan: [] };
}