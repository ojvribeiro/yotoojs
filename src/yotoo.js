// @ts-check

/**
  * YotooJS - YouTube Video Fetcher
  * @version 1.1.2
  * @author Victor Ribeiro <https://github.com/ojvribeiro>
  * @licence MIT
  */


const yotoo = {
  /**
    * @param {string|Object} props - The video URL or the options object
    * @param {function} callback - The callback function when video is loaded
  */
    if (yotoo.apiKey && yotoo.apiKey !== '') {
      let videoArray = []
  get: (videoUrlData, callback) => {

      if (props instanceof Array) {
        props.forEach(item => {
          const videoId = getVideoId(item)

          videoArray.push(videoId)
        })
      }
      else {
        if (typeof props === 'string') {
          const videoId = getVideoId(props)

          videoArray.push(videoId)
        }
        else {
          if (props.url instanceof Array) {
            props.url.forEach(item => {
              const videoId = getVideoId(item)

              videoArray.push(videoId)
            })
          }
          else {
            videoUrl = props.url

            const videoId = getVideoId(props.url)

            videoArray.push(videoId)
          }
        }
      }

      const ytapi = {
        endpoint: 'https://www.googleapis.com/youtube/v3/videos',
        part: 'id%2C+snippet%2C+contentDetails',
      }

      // Initialize empty idList
      ytapi.idList = ''

      for (let index in videoArray) {
        if (index < videoArray.length) {
        } else {
          api.idList += `id=${videoIdArray[index]}&`
          api.idList += `id=${videoIdArray[index]}`
        }
      }

      function getVideoId(videoUrl) {
        const id = videoUrl.replace(/(.*?)(?:youtube\.[a-z]+\/[a-z\?\&]*v[/|=]|youtu\.be\/)([0-9a-zA-Z-_]+)/g, '$2')
        return id
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
          })
        })

        return videoArray
      })

        if (typeof props === 'object') {
          if (props.debug === true) {
            console.log('videoProps: ', video)
          }
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

window.yotoo = yotoo