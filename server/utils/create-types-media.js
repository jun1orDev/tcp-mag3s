import { TypesMediaModel } from './../models/TypesMedia.model';
const config = useRuntimeConfig();
const types = config.typesMedia;

// Create Types of the media if it doesn't exist
export const createTypesMedia = async () => {
  const typesMediaData = await TypesMediaModel.findAll({ raw: true });

  if (!typesMediaData.length) {
		for (const type of types) {
			try {
				await TypesMediaModel.create({ name: type });
			} catch (err) {
				console.log(err);
			}
		}
	}
}
