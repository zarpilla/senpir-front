module.exports = {
  pwa: {
    name: 'Senpir',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: 'https://senpir.webcoop.cat/.*',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
      ],
      preCaching: [
        { url: '/', revision: null },
        { url: '/itinerary', revision: null },
      ],
      cacheOptions: {
        cleanUrls: false
      }
    }
  }
}