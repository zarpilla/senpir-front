module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,svg,ico,png,html,txt}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};