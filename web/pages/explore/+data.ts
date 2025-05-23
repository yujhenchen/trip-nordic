// import { graphqlClient } from "@/graphql/client";
import type { GQLFilterResponse } from "@/types/explore";
import { gql, GraphQLClient } from "graphql-request";

const graphqlUrl = import.meta.env.VITE_GRAPHQL_API_URL;
const graphqlClient = new GraphQLClient(graphqlUrl);

const filtersQuery = gql`
	query GetFilters {
		fiActivityFilters {
			name
			items
		}
	}
`;

export async function data(): Promise<GQLFilterResponse["fiActivityFilters"]> {
	try {
		const result = await graphqlClient.request<GQLFilterResponse>(
			filtersQuery,
			{},
		);
		return result.fiActivityFilters;
	} catch (err) {
		console.error("get filters error:", err);
		return [];
	}
}
