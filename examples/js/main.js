import { yotoo } from '../../js/yotoo.js' // or `import { yotoo } from 'yotoo'` if NPM

const videoContainer = document.querySelector('.video-container')

/**
  * First, you must create a project in the Google Developers Console and generate a new API key.
  * Then, you must set the API key in the `yotoo.apiKey` variable.
  *
  * If you're using Webpack, you can set the API key in a `.env` file.
  *
  * @see https://stackoverflow.com/a/44399524/5125223
 */

yotoo.apiKey = 'YOUR_API_KEY_HERE' // `process.env.MIX_YOUTUBE_API_KEY` (check the `.env.example` file)



/**
  * Usage:
  * yotoo.get(videoURL, callbackFn(response))
  * or
  * yotoo.get({url: videoURL}, callbackFn(response))
*/

yotoo.get(
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  
  // First parameter is the video URL, or an object with the `url` property or an array of URLs
  // The second is callback function when video is loaded
  function (video) { // The video variable contains all the information about the video
    console.log('Video loaded:', video)

    // You can do whatever you want with the video props
    videoContainer.innerHTML =
    /* html */`
      <iframe
        src="https://youtube.com/embed/${video.id}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    `
  }
)