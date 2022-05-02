# YotooJS

Tiny library to fetch videos from YouTube.

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

  response => {
    console.log('Videos loaded:', response)
  }
)
```

The `response` returned is an array of video objects.

Below you can see a sample JSON response:

```json
[
  {
    "id": "dQw4w9WgXcQ",

    "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",

    "description": "The official video for “Never Gonna Give You Up” by Rick Astley",

    "channelTitle": "Rick Astley",

    "duration": "PT3M33S",

    "date": Sun Oct 25 2009 04:57:33 GMT-0200 (Horário de Verão de Brasília),

    "tags": [
      "rick astley",
      "Never Gonna Give You Up",
      "nggyu",
      "never gonna give you up lyrics",
      "rick rolled"
    ],

    "thumb": {
      "default": "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
      "sd": "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      "hd": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    },

    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

    "shortUrl": "https://youtu.be/dQw4w9WgXcQ",

    "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",

    "embed": "<iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
  }
]
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
