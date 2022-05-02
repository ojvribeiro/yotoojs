// @ts-check

/**
  * YotooJS - YouTube Video Fetcher
  * @version 1.2.2-alpha
  * @author Victor Ribeiro <https://github.com/ojvribeiro>
  * @licence MIT
  */


const yotoo = {

  /**
    * @param {string} videoUrl - The video URL
    */
    getVideoIdFromUrl: videoUrl => {
      const urlPattern = /(.*?)(?:youtube\.[a-z]+\/[a-z\?\&]*v[/|=]|youtu\.be\/)([0-9a-zA-Z-_]+)/g
      const videoId = videoUrl.replace(urlPattern, '$2')

      return videoId
    },

    getVideoDataType: videoUrlData => {
      let videoUrlType

      switch (true) {
        case (typeof videoUrlData === 'string'):
          videoUrlType = 'string'
        break

        case (Array.isArray(videoUrlData)):
          videoUrlType = 'array'
        break

        default:
          throw new Error('Invalid video URL data type')
      }

      return videoUrlType
    },



  /**
    * @param {(string[]|string)} videoUrlData - The video URL or an array of URLs
    * @param {function} callback - The callback function when video is loaded
  */
  get: (videoUrlData, callback) => {

    const api = {
      endpoint: 'https://www.googleapis.com/youtube/v3/videos',
      part: 'id%2C+snippet%2C+contentDetails',
      idList: '',
    }

    const videoUrlType = yotoo.getVideoDataType(videoUrlData)


    if (yotoo.apiKey && yotoo.apiKey !== '') {
      let videoIdArray = []

      if (videoUrlType === 'array') {
        Array.from(videoUrlData).forEach(item => {
          const videoId = yotoo.getVideoIdFromUrl(item)

          videoIdArray.push(videoId)
        })
      }
      else {
        if (videoUrlType === 'string') {
          const videoId = yotoo.getVideoIdFromUrl(String(videoUrlData))

          videoIdArray.push(videoId)
        }
      }

      for (let index = 0; index < videoIdArray.length; index++) {
        if (index < videoIdArray.length) {
          api.idList += `id=${videoIdArray[index]}&`
        }
        else {
          api.idList += `id=${videoIdArray[index]}`
        }
      }


      yotoo.fetch(`${api.endpoint}?part=${api.part}&${api.idList}&key=${yotoo.apiKey}`)

      // Get the video info
      .then(response => {
        let videoArray = []
        const data = response.items

        data.forEach(item => {
          videoArray.push({
            id: item.id,

            title: item.snippet.title,

            description: item.snippet.description,

            channelTitle: item.snippet.channelTitle,

            duration: item.contentDetails.duration,

            date: new Date(item.snippet.publishedAt),

            tags: item.snippet.tags,

            thumb: {
              default: item.snippet.thumbnails.default.url,
              sd: item.snippet.thumbnails.medium.url,
              hd: item.snippet.thumbnails.high.url,
            },

            url: `https://www.youtube.com/watch?v=${item.id}`,
            shortUrl: `https://youtu.be/${item.id}`,
            embedUrl: `https://www.youtube.com/embed/${item.id}`,

            embed: `<iframe src="https://www.youtube.com/embed/${item.id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
          })
        })

        return videoArray
      })

      .then(videoArray => {
        if (callback) {
          callback(videoArray)
        }
        else {
          throw new Error('Callback function is not defined')
        }
      })

      .catch(error => {
        throw new Error(`Ocorreu um erro ao carregar o vídeo: ${error}`)
      })
    }
    else {
      console.warn('API key is not set!')
      console.info('You can get one at https://console.developers.google.com/apis/credentials.')
    }
  },


  fetch: (apiUrl) => {
    return new Promise((resolve, reject) => {
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
    })
  }
}

export { yotoo }