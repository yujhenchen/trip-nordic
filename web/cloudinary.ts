import { v2 as cloudinary } from "cloudinary";

const cloudName: string = process.env.CLOUDINARY_CLOUD_NAME ?? "cloud_name";
const apiKey: string = process.env.CLOUDINARY_API_KEY ?? "api_key";
const apiSecret: string = process.env.CLOUDINARY_API_SECRET ?? "api_secret";

cloudinary.config({
	cloud_name: cloudName,
	api_key: apiKey,
	api_secret: apiSecret,
	secure: true,
});

export default cloudinary;
