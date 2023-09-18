require('dotenv').config();

const appCache = process.env.VITE_APP_CACHE
const apiCache = process.env.VITE_API_CACHE

module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,svg,ico,jpg,jpeg,png,html,txt,map,json,mp3,m4a,ogg,wav,ttf,otf,gpx}'
	],
	swDest: 'dist/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^route$/,		
	],
	runtimeCaching: [
		{
			urlPattern: appCache,
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
			urlPattern: apiCache,
			handler: 'CacheFirst',
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