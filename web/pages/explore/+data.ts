// import { graphqlClient } from "@/graphql/client";
import type { GQLFilterResponse } from "@/types/explore";
import { gql, GraphQLClient } from "graphql-request";

const filtersQuery = gql`
	query GetFilters {
		filters {
			name
			items
		}
	}
`;

// TODO: endpoint should be env var
const graphqlClient = new GraphQLClient("http://127.0.0.1:8000/graphql");

export async function data(): Promise<GQLFilterResponse["filters"]> {
	try {
		const result = await graphqlClient.request<GQLFilterResponse>(
			filtersQuery,
			{},
		);
		return result.filters;
	} catch (err) {
		console.error(err);
		// return Promise.reject(err);
		return [];
	}
}
