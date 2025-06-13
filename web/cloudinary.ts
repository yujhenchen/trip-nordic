import { v2 as cloudinary, type ResourceApiResponse } from "cloudinary";

const cloudName: string = process.env.CLOUDINARY_CLOUD_NAME ?? "cloud_name";
const apiKey: string = process.env.CLOUDINARY_API_KEY ?? "api_key";
const apiSecret: string = process.env.CLOUDINARY_API_SECRET ?? "api_secret";

cloudinary.config({
	cloud_name: cloudName,
	api_key: apiKey,
	api_secret: apiSecret,
	secure: true,
});

export async function getAssetsPublicIds({
	resourceType = "image",
	type = "upload",
	prefix = "",
	maxResult = 30,
}): Promise<Array<string> | []> {
	try {
		const result: ResourceApiResponse = await cloudinary.api.resources({
			resource_type: resourceType,
			type,
			prefix,
			max_results: maxResult,
		});
		const ids = result.resources.map((resource) => resource.public_id);
		return ids;
	} catch (error) {
		console.error(error);
		return [];
	}
}
