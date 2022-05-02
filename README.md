# YotooJS

Tiny library to fetch videos from YouTube

## Installation

```bash
npm install yotoojs
```

## Usage

First of all, you must set an API key.

```js
yotoo.apiKey('YOUR_API_KEY')
```

You can get an API key from [Google Developers Console](https://console.developers.google.com/apis/credentials).

### Fetching a single video

```js
import { yotoo } from 'yotoojs'

yotoo.get(
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',

  response => { // The video variable contains all the information about the video
    console.log('Videos loaded:', response)
  }
)
```

### Fetching multiple videos

```js
import { yotoo } from 'yotoojs'

yotoo.get(
  [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=HyWYpM_S-2c',
    'https://www.youtube.com/watch?v=taTTt7dH4Ig',
  ],

  response => {
    console.log('Videos loaded:', response)
  }
)
```

## Dependencies

None. :)

## Author

Victor Ribeiro ([ojvribeiro](https://github.com/ojvribeiro))
