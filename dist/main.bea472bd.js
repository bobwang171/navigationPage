// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $($siteList.find("li.last"));
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);

var hashMap = xObject || [{ logo: "C", logoType: "image", url: "https://codepen.io" }, { logo: "F", logoType: "image", url: "https://figma.com" }, { logo: "C", logoType: "image", url: "https://codesandbox.io" }, { logo: "C", logoType: "image", url: "https://caniuse.com" }, { logo: "G", logoType: "image", url: "https://github.com" }, { logo: "G", logoType: "image", url: "https://gitee.com" }, { logo: "I", logoType: "image", url: "https://www.iconfont.cn" }, { logo: "S", logoType: "image", url: "https://stackoverflow.com" }];
var removeX = function removeX(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //删除/开头的内容
};
var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n        <div class=\"site\">\n          <div class=\"logo\">" + node.logo + "</div>\n          <div class=\"link\">" + removeX(node.url) + "</div>\n          <div class=\"close\">\n            <svg class=\"icon\">\n              <use xlink:href=\"#icon-close\"></use>\n            </svg>\n          </div>\n        </div>\n      </li>").insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", function () {
  var url = window.prompt("添加网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: removeX(url)[0].toUpperCase(), logoType: "image", url: url
  });
  $($siteList.find("li:not(.last)").remove()); //使用$在siteList中寻找li标签，唯独不要last

  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); //把hashMap这个对象转换成字符串
  localStorage.setItem("x", string); //把hashMap以字符串的形式存到localStorage中的x
};
$(document).on("keypress", function (e) {
  var key = e.key;

  console.log(e);
  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) window.open(hashMap[i].url);
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.bea472bd.map