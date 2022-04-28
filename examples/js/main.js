import { yotoo } from '../../dist/yotoo.js'

const videoContainer = document.querySelector('.video-container')

// Steps to get an API key: https://stackoverflow.com/a/44399524/5125223

yotoo.apiKey = 'YOUR_API_KEY_HERE'


// Usage

yotoo.get(
  // First parameter is the video URL
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  
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