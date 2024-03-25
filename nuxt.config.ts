// https://nuxt.com/docs/api/configuration/nuxt-config
const typeMediaDefault = [
	'text',
	'link',
	'color',
	'archive',
	'icon',
	'datetime',
	'boolean',
	'json',
];

export default defineNuxtConfig({
	ui: {
		global: true,
		icons: ['material-symbols', 'ic', 'mdi'],
	},

	typescript: {
		shim: false,
	},

	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},

	runtimeConfig: {
		// DB Conection
		forceDropDb: false,
		forceAlterDb: false,
		nameDb: '',
		userDb: '',
		passDb: '',
		portDb: '',

		// App create User
		rolesType: ['adminmaster', 'admin', 'editor', 'reader'],
		typesMedia: typeMediaDefault,
		adminName: '',
		adminEmail: '',
		adminPass: '',

		// Config Google Cloud Storage
		gcsSubfolder: '',
		gcsSubfolderEnvironment: '',
		gcsBucketname: '',

		// Incentive Campaign API

		public: {
			typesMedia: typeMediaDefault,
			pathAssets: '',

			// Incentive Campaign API Public
			ApiIncentiveClientId: '',
			ApiIncentiveClientSecret: '',
			ApiIncentiveKeyValue: '',
			ApiIncentiveReferral: '',
			ApiIncentiveSystemIdentity: '',
			ApiIncentiveSystemContents: '',
			ApiIncentiveGamification: '',

			// User Auth Login Test Hub
			ApiIncentiveUserTest: '',
			ApiIncentivePassTest: '',
		},
	},

	modules: [
		'@pinia/nuxt',
		'nuxt-icon',
		'@nuxt/ui',
		'vue3-carousel-nuxt',
		'@formkit/auto-animate/nuxt',
		'nuxt3-meta-pixel',
		'@vite-pwa/nuxt',
	],

	facebook: {
		/* module options */
		track: 'PageView',
		autoPageView: true,
		debug: false,
		disabled: true,
	},

	pwa: {
		/* your pwa options */
		// registerWebManifestInRouteRules: true,
		srcDir: 'service-worker',
		filename: 'sw.ts',
		registerType: 'autoUpdate',
		manifest: {
			name: 'TCP Mag3s',
			short_name: 'TCP Mag3s',
			description: 'Teste de PWA',
			theme_color: '#edbe3a',
			lang: 'pt-br',
			icons: [
				{
					src: 'icons/maskable_icon_x48.png',
					sizes: '48x48',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: 'icons/maskable_icon_x72.png',
					sizes: '72x72',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: 'icons/maskable_icon_x96.png',
					sizes: '96x96',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: 'icons/maskable_icon_x128.png',
					sizes: '128x128',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: 'icons/maskable_icon_x144.png',
					sizes: '144x144',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: 'icons/maskable_icon_x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: 'icons/maskable_icon_x384.png',
					sizes: '384x384',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: 'icons/maskable_icon_x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: 'icons/maskable_icon.png',
					sizes: '1024x1024',
					type: 'image/png',
					purpose: 'maskable',
				},
			],
		},
		workbox: {
			navigateFallback: '/',
			navigateFallbackAllowlist: [/^\/$/],
		},
		client: {
			installPrompt: true,
		},
		devOptions: {
			enabled: true,
			suppressWarnings: true,
			navigateFallback: '/',
			navigateFallbackAllowlist: [/^\/$/],
			type: 'module',
		},
	},

	components: [{ path: '~/components/admin', prefix: 'Adm' }, '~/components'],

	colorMode: {
		preference: 'light',
	},

	imports: {
		dirs: ['.stores'],
	},

	pinia: {
		autoImports: ['defineStore'],
	},

	css: ['animate.css/animate.min.css', '~/assets/css/main.css'],
});
