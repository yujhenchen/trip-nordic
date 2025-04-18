import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "http://127.0.0.1:8000/graphql",
	documents: ["**/*.{ts,tsx}"],
	generates: {
		"./gql/": {
			preset: "client",
		},
	},
};
export default config;
