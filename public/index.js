var url = "http://bashorg.org/rss.xml";
var cors_api_url = "https://cors-anywhere.herokuapp.com/";

function deleteMetaInfo(subStr, string) {
  var a = string.replace(subStr, "");
  console.log(a);
  return a;
}

function parser(rss) {
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(rss, "text/xml");

  var items = xmlDoc.getElementsByTagName("description");
  console.log(items);
  var arrItems = "";

  for (let item of items) {
    var delSymbols = deleteMetaInfo("<![CDATA[", item.innerHTML);
    delSymbols = deleteMetaInfo("]]>", delSymbols);
    arrItems += '<div class="border">' + delSymbols + " </div>";
  }

  var outputField = document.getElementById("list");
  console.log(arrItems);
  outputField.innerHTML = arrItems;
}

function doCORSRequest(options) {
  var x = new XMLHttpRequest();
  console.log(options.method, cors_api_url + options.url);

  //x.open(options.method, "rss.xml"); //Если сайт говорит что много вопросов попробуй считать локальную копию
  x.open(options.method, cors_api_url + options.url); // А эту строку закоментируй
  x.onload = x.onerror = function () {
    parser(x.responseText);
  };
  x.send(options.data);
}

// Bind event
(function () {
  var urlField = url;
  var outputField = document.getElementById("list");
  doCORSRequest({
    method: "GET",
    url: url,
  });
})();
