import cloudinary from "@/cloudinary";
import type { BgImgStore } from "@/globalStore";

import { Cloudinary } from "@cloudinary/url-gen";
import { auto, scale } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

import type { ResourceApiResponse } from "cloudinary";

export async function getAssetsPublicIds({
	resourceType = "image",
	type = "upload",
	prefix = "",
	maxResult = 30,
}): Promise<Array<string>> {
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

export async function initBgImages(
	cloudName: string,
	imgPrefix: string,
	bgImgStoreInstance: BgImgStore,
): Promise<void> {
	const imgIds = await getAssetsPublicIds({ prefix: imgPrefix });

	bgImgStoreInstance.setImgIds(imgIds);

	const imgUrlMap = new Map<string, { default: string; small: string }>();
	const cld = new Cloudinary({ cloud: { cloudName } });

	for (const imgId of imgIds) {
		const defaultImg = cld
			.image(imgId)
			.format("auto")
			.resize(auto().gravity(autoGravity()));

		const smallImg = cld.image(imgId).format("auto").resize(scale().width(20));

		imgUrlMap.set(imgId, {
			default: defaultImg.toURL(),
			small: smallImg.toURL(),
		});
	}

	bgImgStoreInstance.setImgUrlMap(imgUrlMap);
}
