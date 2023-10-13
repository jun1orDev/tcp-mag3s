import { TagsMediaModel } from './../models/TagsMedia.model';
const config = useRuntimeConfig();
const tags = config.tagsMedia;

// Create Tags of the media if it doesn't exist
export const createTagsMedia = async () => {
  const TagsMediaData = await TagsMediaModel.findAll({ raw: true });

  if (!TagsMediaData.length) {
		for (const tag of tags) {
			try {
				await TagsMediaModel.create({ name: tag });
			} catch (err) {
				console.log(err);
			}
		}
	}
}
