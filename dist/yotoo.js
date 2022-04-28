/**
  * YotooJS - YouTube Video Fetcher
  * @author Victor Ribeiro <https://github.com/ojvribeiro>
  * @licence MIT
  */


const yotoo = {
  /**
    * @param {string|Object} props - The video URL or the options object
    * @param {function} callback - The callback function when video is loaded
  */
  get: (props, callback) => {
    if (yotoo.apiKey && yotoo.apiKey !== 'YOUR_API_KEY_HERE') {
      const videoUrl = (typeof props === 'string') ? props : props.url

      // Get the id from the video URL (works with youtu.be)
      const videoId = videoUrl.replace(/(.*?)(?:youtube\.[a-z]+\/[a-z\?\&]*v[/|=]|youtu\.be\/)([0-9a-zA-Z-_]+)/g, '$2')

      const ytapi = {
        endpoint: 'https://www.googleapis.com/youtube/v3/videos',
        part: 'id%2C+snippet%2C+contentDetails',
        id: videoId
      }

      yotoo.fetch(`${ytapi.endpoint}?part=${ytapi.part}&id=${ytapi.id}&key=${yotoo.apiKey}`)

      // Get the video info
      .then(response => {
        const data = response.items[0]

        const video = {
          id: data.id,

          title: data.snippet.title,

          description: data.snippet.description,

          date: new Date(data.snippet.publishedAt),

          tags: data.snippet.tags,

          thumb: {
            default: data.snippet.thumbnails.default.url,
            sd: data.snippet.thumbnails.medium.url,
            hd: data.snippet.thumbnails.high.url,
          },
        }

        return video
      })

      .then(video => {
        if (typeof props === 'object') {
          if (props.debug === true) {
            console.log('videoProps: ', video)
          }
        }

        if (callback) callback(video)
      })

      .catch(error => {
        console.error('Ocorreu um erro ao carregar o vídeo: ', error)
      })
    }
    else {
      console.error('You must provide a valid YouTube API key to use this library. You can get one at https://console.developers.google.com/apis/credentials.')
    }
  },


  fetch: (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
    })
  }
}

export { yotoo }