# YotooJS

![npm](https://img.shields.io/npm/v/yotoojs?color=d40416&style=for-the-badge)

Tiny library to fetch videos from YouTube.

## Installation

You can install YotooJS via npm:

```bash
npm install yotoojs
```

Or you can use it on browser via Unpkg's CDN:

```html
<script src="https://unpkg.com/yotoojs@latest/dist/yotoo.js"></script>
```

## Setup

First, import yotoo:

```js
import { yotoo } from 'yotoojs'
```

Then set an API key.

```js
yotoo.apiKey('YOUR_API_KEY')
```

You can get an API key from [Google Developers Console](https://console.developers.google.com/apis/credentials).

## Examples

### Fetching a single video

```js
yotoo.get(
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',

  response => {
    const video = response[0]

    console.log(`Video title: ${video.title}`)
  }
)
```

### Fetching multiple videos

```js
yotoo.get(
  [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=HyWYpM_S-2c',
    'https://www.youtube.com/watch?v=taTTt7dH4Ig',
  ],

  response => {
    response.forEach(video => {
      console.log(`Video title: ${video.title}`)
    })
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

## Dependencies

None. :)

## Author

Victor Ribeiro ([ojvribeiro](https://github.com/ojvribeiro))
