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
		NAME_DB: 'tcp-mag3s',
		USER_DB: 'root',
		PASS_DB: '',
		PORT_SERVER_DB: process.env.PORT_DB,

		// App create User
		ROLES_TYPE: ['adminmaster', 'admin', 'editor', 'reader'],
		ADMIN_NAME: 'Junior Araújo',
		ADMIN_EMAIL: 'junior.araujo@mag3s.com',
		ADMIN_PASS: process.env.ADMIN_PASS,
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
