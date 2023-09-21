// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
		PORT_SERVER_DB: 3306,

		// App create User
		ROLES_TYPE: ['adminmaster', 'admin', 'editor', 'reader'],
		ADMIN_NAME: 'Junior Araújo',
		ADMIN_EMAIL: 'junior.araujo@mag3s.com',
		ADMIN_PASS: 'A&9iTjy69&9MM7CD',
	},

	modules: ['@pinia/nuxt', 'nuxt-icon', '@nuxt/ui'],

	ui: {
		global: true,
		icons: ['material-symbols'],
	},

	imports: {
		dirs: ['.stores'],
	},

	pinia: {
		autoImports: ['defineStore'],
	},
})
