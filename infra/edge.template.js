// CloudFront viewer-request function (cloudfront-js-2.0). infra/build.mjs fills
// in MOVED and ARCHIVES from redirects.mjs and writes it into template.yaml.
var HOST = "__HOST__";
var MOVED = __MOVED__;
var ARCHIVES = __ARCHIVES__;
var ARCHIVE_TARGET = "__ARCHIVE_TARGET__";
// Files without an extension that are served as they are (RSS feeds, as WordPress had them).
var RAW = { "/feed": 1, "/comments/feed": 1 };

function go(location) {
  return { statusCode: 301, statusDescription: "Moved Permanently", headers: { location: { value: location }, "cache-control": { value: "max-age=3600" } } };
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var host = request.headers.host ? request.headers.host.value : "";
  var qs = "";
  var keys = Object.keys(request.querystring);
  if (keys.length) {
    qs = "?" + keys.map(function (k) { var q = request.querystring[k]; return q.value === "" ? k : k + "=" + q.value; }).join("&");
  }

  // www and old-host requests go to the main address.
  if (HOST && host && host !== HOST && host.indexOf("cloudfront.net") === -1) return go("https://" + HOST + uri + qs);

  // WordPress addresses end in a slash; ours don't.
  if (uri.length > 1 && uri.charAt(uri.length - 1) === "/") return go(uri.replace(/\/+$/, "") + qs);
  if (uri === "/index.html") return go("/" + qs);
  if (uri.length > 5 && uri.slice(-5) === ".html" && uri !== "/404.html") return go(uri.slice(0, -5) + qs);

  if (MOVED[uri]) return go(MOVED[uri] + qs);
  for (var i = 0; i < ARCHIVES.length; i++) if (new RegExp(ARCHIVES[i]).test(uri)) return go(ARCHIVE_TARGET);

  if (uri === "/") request.uri = "/index.html";
  else if (!RAW[uri] && uri.lastIndexOf(".") <= uri.lastIndexOf("/")) request.uri = uri + ".html";
  return request;
}
