import { graphqlClient } from "@/graphql/client";
import type { GQLFilterResponse } from "@/types/explore";
import { gql } from "graphql-request";

const filtersQuery = gql`
	query GetFilters {
		filters {
			name
			items
		}
	}
`;

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
