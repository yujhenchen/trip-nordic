import { PageContextServer } from "vike/types";

export type Data = {
    activity: { name: string }[];
}

export default async function data(_pageContext: PageContextServer): Promise<Data> {
    return { activity: [] };
}