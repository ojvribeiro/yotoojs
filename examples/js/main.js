import { yotoo } from 'yotoojs'


/**
  * First, you must create a project in the Google Developers Console and generate a new API key.
  * Then, you must set the API key in the `yotoo.apiKey` variable.
  *
  * If you're using Webpack, you can set the API key in a `.env` file.
  *
  * @see https://stackoverflow.com/a/44399524/5125223
 */
// yotoo.apiKey = 'YOUR_API_KEY_HERE'
yotoo.apiKey = process.env.MIX_YOUTUBE_API_KEY



/**
  * Usage:
  * yotoo.get(videoURL, callbackFn(response))
  * or
  * yotoo.get({url: videoURL}, callbackFn(response))
*/

yotoo.get(
  // First parameter is the video URL, or an object with the `url` property or an array of URLs
  [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  ],

  // The second is callback function when video is loaded
  function (videos) { // The video variable contains all the information about the video
    console.log('Videos loaded:', videos)

    const videoContainer = document.querySelectorAll('.video-container')

    videos.forEach(video => {
      videoContainer.forEach(item => {
        // You can display the embedded videos
        if (item.classList.contains('--embed')) {
          item.insertAdjacentHTML('beforeend',
            `<iframe src="${video.embedUrl}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
          )
        }

        // Or show a thumbnail gallery
        else if (item.classList.contains('--thumbs')) {
          item.insertAdjacentHTML('beforeend',
            `<a href="${video.url}" target="_blank">
              <img src="${video.thumb.sd}" alt="${video.title}" title="${video.title}" />
            </a>`
          )
        }
      })
    })
  }
)