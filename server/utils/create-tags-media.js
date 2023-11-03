import { TagsMediaModel } from './../models/TagsMedia.model';

// Create Tags of the media if it doesn't exist
export const createTagsMedia = async (tag) => {
	const TagMediaData = await TagsMediaModel.findOne({
		raw: true,
		where: { name: tag },
	});

	if (!Boolean(TagMediaData)) {
		await TagsMediaModel.create({ name: tag });
	}
};
