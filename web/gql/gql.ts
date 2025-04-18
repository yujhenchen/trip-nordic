/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
	"\n\tquery GetActivities($first: Int, $offset: Int) {\n\t\tactivities(first: $first, offset: $offset) {\n\t\t\ttotalCount\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tcategory\n\t\t\t\t\tcity\n\t\t\t\t\tdescriptionen\n\t\t\t\t\tlanguages\n\t\t\t\t\tnameen\n\t\t\t\t\tregion\n\t\t\t\t\tseasons\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetActivitiesDocument;
};
const documents: Documents = {
	"\n\tquery GetActivities($first: Int, $offset: Int) {\n\t\tactivities(first: $first, offset: $offset) {\n\t\t\ttotalCount\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tcategory\n\t\t\t\t\tcity\n\t\t\t\t\tdescriptionen\n\t\t\t\t\tlanguages\n\t\t\t\t\tnameen\n\t\t\t\t\tregion\n\t\t\t\t\tseasons\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetActivitiesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery GetActivities($first: Int, $offset: Int) {\n\t\tactivities(first: $first, offset: $offset) {\n\t\t\ttotalCount\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tcategory\n\t\t\t\t\tcity\n\t\t\t\t\tdescriptionen\n\t\t\t\t\tlanguages\n\t\t\t\t\tnameen\n\t\t\t\t\tregion\n\t\t\t\t\tseasons\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n",
): (typeof documents)["\n\tquery GetActivities($first: Int, $offset: Int) {\n\t\tactivities(first: $first, offset: $offset) {\n\t\t\ttotalCount\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tcategory\n\t\t\t\t\tcity\n\t\t\t\t\tdescriptionen\n\t\t\t\t\tlanguages\n\t\t\t\t\tnameen\n\t\t\t\t\tregion\n\t\t\t\t\tseasons\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
