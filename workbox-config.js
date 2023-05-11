module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,svg,ico,png,html,txt,map}'
	],
	swDest: 'dist/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	runtimeCaching: [
		{
			urlPattern: 'https://senpir.webcoop.cat/.*',
			handler: 'NetworkFirst',
			method: 'GET',
			options: {
				cacheName: 'app-cache',				
				cacheableResponse: {
				  // github.com/{user}.png will redirect to avatars.githubusercontent.com
				  statuses: [0, 200/* , 302 */],
				},
				fetchOptions: {
				  redirect: 'follow',
				},
			  },
		},
		{
			urlPattern: 'https://senpir-api.webcoop.cat/.*',
			handler: 'NetworkFirst',
			method: 'GET',
			options: {
				cacheName: 'api-cache',				
				cacheableResponse: {
				  // github.com/{user}.png will redirect to avatars.githubusercontent.com
				  statuses: [0, 200/* , 302 */],
				},
				fetchOptions: {
				  redirect: 'follow',
				},
			  },
		}
	]
};