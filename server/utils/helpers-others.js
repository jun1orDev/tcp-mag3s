export const switchTextToBoolean = (value) => {
	if (String(value) === '1') {
		return true;
	} else if (String(value) === '0') {
		return false;
	}

	return value;
};

export const switchInputTextBoolean = (value) => {
	if (String(value).toUpperCase() === 'ON') {
		return '1';
	}

	return '0';
};

// check only text
export const hasOnlyText = /^[A-Za-z]+( [A-Za-z]+)*$/;

// First Letter Upercase in String
export function toLetterFisrtUperCase(str) {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

// [0]: text, [1]: link, [2]: color, [3]: archive, [4]: icon, [5]: datatime, [6]: boolean
const { typesMedia } = useRuntimeConfig();

export const listSchemaDataMedia = [
	// Config
	{ name: 'config_will_have_hotsite', tag: 'config', type: typesMedia[6] },

	// Layout
	{ name: 'layout_background_app', tag: 'layout', type: typesMedia[3] },
	{ name: 'layout_background_modal', tag: 'layout', type: typesMedia[3] },

	// Brand
	{ name: 'brand_image_one', tag: 'brand', type: typesMedia[3] },
	{ name: 'brand_image_two', tag: 'brand', type: typesMedia[3] },
	{ name: 'brand_image_three', tag: 'brand', type: typesMedia[3] },

	// Banner
	{ name: 'banner_background_card_one', tag: 'banner', type: typesMedia[3] },
	{ name: 'banner_image_card_one', tag: 'banner', type: typesMedia[3] },
	{ name: 'banner_text_card_title_one', tag: 'banner', type: typesMedia[0] },
	{ name: 'banner_text_card_subtitle_one', tag: 'banner', type: typesMedia[0] },
	{ name: 'banner_background_card_two', tag: 'banner', type: typesMedia[3] },
	{ name: 'banner_image_card_two', tag: 'banner', type: typesMedia[3] },
	{ name: 'banner_text_card_title_two', tag: 'banner', type: typesMedia[0] },
	{ name: 'banner_text_card_subtitle_two', tag: 'banner', type: typesMedia[0] },
	{ name: 'banner_text_card_label_button_two', tag: 'banner', type: typesMedia[0] },

	// Colors
	{ name: 'colors_text_one', tag: 'colors', type: typesMedia[2] },
	{ name: 'colors_background_one', tag: 'colors', type: typesMedia[2] },
	{
		name: 'colors_carousel_pagination_background',
		tag: 'colors',
		type: typesMedia[2],
	},
	{
		name: 'colors_carousel_pagination_active',
		tag: 'colors',
		type: typesMedia[2],
	},
	{ name: 'colors_background_button', tag: 'colors', type: typesMedia[2] },
	{ name: 'colors_text_button', tag: 'colors', type: typesMedia[2] },

	// Modal
	{ name: 'modal_text_prize_title_one', tag: 'modal', type: typesMedia[0] },
	{ name: 'modal_text_prize_subtitle_one', tag: 'modal', type: typesMedia[0] },
	{ name: 'modal_text_prize_label_one', tag: 'modal', type: typesMedia[0] },
];
