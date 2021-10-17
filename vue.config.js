module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true, 
			builderOptions: {
				"extraResources": [
					{
						"from": "./resources",
						"to": "",
						"filter": ["**/*"]
					}
				]
			}
		}
	},

	transpileDependencies: [
		'vuetify',
		'vuex-module-decorators'
	]
}
