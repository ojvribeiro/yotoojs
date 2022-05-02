/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/yotoo.js ***!
  \**********************/
// @ts-check

/**
  * YotooJS - YouTube Video Fetcher
  * @version 1.1.2
  * @author Victor Ribeiro <https://github.com/ojvribeiro>
  * @licence MIT
  */
var yotoo = {
  /**
    * @param {string} videoUrl - The video URL
    */
  getVideoIdFromUrl: function getVideoIdFromUrl(videoUrl) {
    var urlPattern = /(.*?)(?:youtube\.[a-z]+\/[a-z\?\&]*v[/|=]|youtu\.be\/)([0-9a-zA-Z-_]+)/g;
    var videoId = videoUrl.replace(urlPattern, '$2');
    return videoId;
  },
  getVideoDataType: function getVideoDataType(videoUrlData) {
    var videoUrlType;

    switch (true) {
      case typeof videoUrlData === 'string':
        videoUrlType = 'string';
        break;

      case Array.isArray(videoUrlData):
        videoUrlType = 'array';
        break;

      default:
        throw new Error('Invalid video URL data type');
    }

    return videoUrlType;
  },

  /**
    * @param {(string[]|string)} videoUrlData - The video URL or an array of URLs
    * @param {function} callback - The callback function when video is loaded
  */
  get: function get(videoUrlData, callback) {
    var api = {
      endpoint: 'https://www.googleapis.com/youtube/v3/videos',
      part: 'id%2C+snippet%2C+contentDetails',
      idList: ''
    };
    var videoUrlType = yotoo.getVideoDataType(videoUrlData);

    if (yotoo.apiKey && yotoo.apiKey !== '') {
      var videoIdArray = [];

      if (videoUrlType === 'array') {
        Array.from(videoUrlData).forEach(function (item) {
          var videoId = yotoo.getVideoIdFromUrl(item);
          videoIdArray.push(videoId);
        });
      } else {
        if (videoUrlType === 'string') {
          var videoId = yotoo.getVideoIdFromUrl(String(videoUrlData));
          videoIdArray.push(videoId);
        }
      }

      for (var index = 0; index < videoIdArray.length; index++) {
        if (index < videoIdArray.length) {
          api.idList += "id=".concat(videoIdArray[index], "&");
        } else {
          api.idList += "id=".concat(videoIdArray[index]);
        }
      }

      yotoo.fetch("".concat(api.endpoint, "?part=").concat(api.part, "&").concat(api.idList, "&key=").concat(yotoo.apiKey)) // Get the video info
      .then(function (response) {
        var videoArray = [];
        var data = response.items;
        data.forEach(function (item) {
          videoArray.push({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle,
            duration: item.contentDetails.duration,
            date: new Date(item.snippet.publishedAt),
            tags: item.snippet.tags,
            thumb: {
              "default": item.snippet.thumbnails["default"].url,
              sd: item.snippet.thumbnails.medium.url,
              hd: item.snippet.thumbnails.high.url
            },
            url: "https://www.youtube.com/watch?v=".concat(item.id),
            shortUrl: "https://youtu.be/".concat(item.id),
            embedUrl: "https://www.youtube.com/embed/".concat(item.id),
            embed: "<iframe src=\"https://www.youtube.com/embed/".concat(item.id, "\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>")
          });
        });
        return videoArray;
      }).then(function (videoArray) {
        if (callback) {
          callback(videoArray);
        } else {
          throw new Error('Callback function is not defined');
        }
      })["catch"](function (error) {
        throw new Error("Ocorreu um erro ao carregar o v\xEDdeo: ".concat(error));
      });
    } else {
      console.warn('API key is not set!');
      console.info('You can get one at https://console.developers.google.com/apis/credentials.');
    }
  },
  fetch: function (_fetch) {
    function fetch(_x) {
      return _fetch.apply(this, arguments);
    }

    fetch.toString = function () {
      return _fetch.toString();
    };

    return fetch;
  }(function (apiUrl) {
    return new Promise(function (resolve, reject) {
      fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (data) {
        return resolve(data);
      })["catch"](function (error) {
        return reject(error);
      });
    });
  })
};
window.yotoo = yotoo;
/******/ })()
;