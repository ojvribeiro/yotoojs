function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)
/**
  * YotooJS - YouTube Video Fetcher
  * @version 1.1.2
  * @author Victor Ribeiro <https://github.com/ojvribeiro>
  * @licence MIT
  */}var yotoo={get:function(props,callback){if(yotoo.apiKey&&""!==yotoo.apiKey){var getVideoId=function(videoUrl){return videoUrl.replace(/(.*?)(?:youtube\.[a-z]+\/[a-z\?\&]*v[/|=]|youtu\.be\/)([0-9a-zA-Z-_]+)/g,"$2")},videoArray=[];if(props instanceof Array)props.forEach((function(item){var videoId=getVideoId(item);videoArray.push(videoId)}));else if("string"==typeof props){var videoId=getVideoId(props);videoArray.push(videoId)}else if(props.url instanceof Array)props.url.forEach((function(item){var videoId=getVideoId(item);videoArray.push(videoId)}));else{videoUrl=props.url;var _videoId=getVideoId(props.url);videoArray.push(_videoId)}var ytapi={endpoint:"https://www.googleapis.com/youtube/v3/videos",part:"id%2C+snippet%2C+contentDetails",idList:""};for(var index in videoArray)index<videoArray.length?ytapi.idList+="id=".concat(videoArray[index],"&"):ytapi.idList+="id=".concat(videoArray[index]);yotoo.fetch("".concat(ytapi.endpoint,"?part=").concat(ytapi.part,"&").concat(ytapi.idList,"&key=").concat(yotoo.apiKey)).then((function(response){var video=[];return response.items.forEach((function(item){video.push({id:item.id,title:item.snippet.title,description:item.snippet.description,date:new Date(item.snippet.publishedAt),tags:item.snippet.tags,thumb:{default:item.snippet.thumbnails.default.url,sd:item.snippet.thumbnails.medium.url,hd:item.snippet.thumbnails.high.url},url:"https://www.youtube.com/watch?v=".concat(item.id),shortUrl:"https://youtu.be/".concat(item.id),embedUrl:"https://www.youtube.com/embed/".concat(item.id)})})),video})).then((function(video){"object"===_typeof(props)&&props.debug,callback&&callback(video)})).catch((function(error){throw new Error("Ocorreu um erro ao carregar o vídeo: ",error)}))}},fetch:function(_fetch){function fetch(_x){return _fetch.apply(this,arguments)}return fetch.toString=function(){return _fetch.toString()},fetch}((function(url){return new Promise((function(resolve,reject){fetch(url).then((function(response){return response.json()})).then((function(data){return resolve(data)})).catch((function(error){return reject(error)}))}))}))};export{yotoo};
