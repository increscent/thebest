function ajax(url, method, data, callback) {
  if (!callback) {
    callback = data;
    data = '';
  }

  var request = new XMLHttpRequest();
  request.open(method, url);
  request.onreadystatechange = function () {
    if (request.readyState==4) {
      return callback(request.responseText);
    }
  };
  if (method == 'POST') {
    request.setRequestHeader("Content-type", "application/json");
  }

  request.send(JSON.stringify(data));
}
