# YotooJS

Tiny library to fetch videos from YouTube

## Installation

```bash
npm install yotoojs
```

## Usage

```js
import { yotoo } from 'yotoojs';

yotoo.get(
  // First parameter is the video URL, or an object with the `url` property or an array of URLs
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',

  /*
    // Example with multiple URLs:
    [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=noq-ZHTD2Cg',
      'https://www.youtube.com/watch?v=G_exsvTKXVU',
    ],

    // Example with an object:
    {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // or ['https://www.youtube.com/watch?v=dQw4w9WgXcQ']
      debug: true,
    },
  */

  // The second is callback function when video is loaded
  function (video) { // The video variable contains all the information about the video
    console.log('Videos loaded:', video)
  }
)
```

## Dependencies

None. :)

## Author

Victor Ribeiro (@ojvribeiro)
