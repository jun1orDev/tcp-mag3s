// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ui: {
		global: true,
		icons: ['material-symbols'],
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
		FORCE_DROP_DB: false,
		FORCE_ALTER_DB: false,
		NAME_DB: process.env.NUXT_API_NAME_DB,
		USER_DB: process.env.NUXT_API_USER_DB,
		PASS_DB: process.env.NUXT_API_PASS_DB,
		PORT_SERVER_DB: process.env.NUXT_API_PORT_DB,

		// App create User
		ROLES_TYPE: ['adminmaster', 'admin', 'editor', 'reader'],
		ADMIN_NAME: process.env.NUXT_API_ADMIN_NAME,
		ADMIN_EMAIL: process.env.NUXT_API_ADMIN_EMAIL,
		ADMIN_PASS: process.env.NUXT_API_ADMIN_PASS,
	},

	modules: ['@pinia/nuxt', 'nuxt-icon', '@nuxt/ui'],

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

	css: ['~/assets/css/main.css'],
});
