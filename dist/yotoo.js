(()=>{
/**
  * YotooJS - YouTube Video Fetcher
  * @version 1.3.0-alpha
  * @author Victor Ribeiro <https://github.com/ojvribeiro>
  * @licence MIT
  */
var yotoo={setApiKey:function(key){key&&(yotoo.apiKey=key)},getVideoIdFromUrl:function(videoUrl){return videoUrl.replace(/(.*?)(?:youtube\.[a-z]+\/[a-z\?\&]*v[/|=]|youtu\.be\/)([0-9a-zA-Z-_]+)/g,"$2")},getVideoDataType:function(videoUrlData){var videoUrlType;switch(!0){case"string"==typeof videoUrlData:videoUrlType="string";break;case Array.isArray(videoUrlData):videoUrlType="array";break;default:throw new Error("Invalid video URL data type")}return videoUrlType},get:function(videoUrlData,callback){var api={endpoint:"https://www.googleapis.com/youtube/v3/videos",part:"id%2C+snippet%2C+contentDetails",idList:""},videoUrlType=yotoo.getVideoDataType(videoUrlData);if(yotoo.apiKey&&""!==yotoo.apiKey){var videoIdArray=[];if("array"===videoUrlType)Array.from(videoUrlData).forEach((function(item){var videoId=yotoo.getVideoIdFromUrl(item);videoIdArray.push(videoId)}));else if("string"===videoUrlType){var videoId=yotoo.getVideoIdFromUrl(String(videoUrlData));videoIdArray.push(videoId)}for(var index=0;index<videoIdArray.length;index++)index<videoIdArray.length?api.idList+="id=".concat(videoIdArray[index],"&"):api.idList+="id=".concat(videoIdArray[index]);yotoo.fetch("".concat(api.endpoint,"?part=").concat(api.part,"&").concat(api.idList,"&key=").concat(yotoo.apiKey)).then((function(response){var videoArray=[];return response.items.forEach((function(item){videoArray.push({id:item.id,title:item.snippet.title,description:item.snippet.description,channelTitle:item.snippet.channelTitle,duration:item.contentDetails.duration,date:new Date(item.snippet.publishedAt),tags:item.snippet.tags,thumb:{default:item.snippet.thumbnails.default.url,sd:item.snippet.thumbnails.medium.url,hd:item.snippet.thumbnails.high.url},url:"https://www.youtube.com/watch?v=".concat(item.id),shortUrl:"https://youtu.be/".concat(item.id),embedUrl:"https://www.youtube.com/embed/".concat(item.id),embed:'<iframe src="https://www.youtube.com/embed/'.concat(item.id,'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')})})),videoArray})).then((function(videoArray){if(!callback)throw new Error("Callback function is not defined");callback(videoArray)})).catch((function(error){throw new Error("Ocorreu um erro ao carregar o vídeo: ".concat(error))}))}else console.warn("API key is not set!"),console.info("You can get one at https://console.developers.google.com/apis/credentials.")},fetch:function(_fetch){function fetch(_x){return _fetch.apply(this,arguments)}return fetch.toString=function(){return _fetch.toString()},fetch}((function(apiUrl){return new Promise((function(resolve,reject){fetch(apiUrl).then((function(response){return response.json()})).then((function(data){return resolve(data)})).catch((function(error){return reject(error)}))}))}))};window.yotoo=yotoo})();