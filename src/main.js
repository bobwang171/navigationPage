const $siteList = $(".siteList")
const $lastLi = $($siteList.find("li.last"))
const x = (localStorage.getItem("x"))
const xObject = JSON.parse(x);

const hashMap=xObject|| [
    { logo: "C", logoType:"image",url: "https://codepen.io" },
    { logo: "F",logoType:"image", url: "https://figma.com" },
    { logo: "C",logoType:"image", url: "https://codesandbox.io" },
    { logo: "C",logoType:"image", url: "https://caniuse.com" },
    { logo: "G",logoType:"image", url: "https://github.com" },
    { logo: "G",logoType:"image", url: "https://gitee.com" },
    { logo: "I",logoType:"image", url: "https://www.iconfont.cn" },
    { logo: "S",logoType:"image", url: "https://stackoverflow.com" }
];
const removeX = (url) => {
    return url.replace("http//", "")
        .replace("https://", "")
        .replace("www.", "").replace(/\/.*/, "")
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
      const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${removeX(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
      </li>`).insertBefore($lastLi)
      $li.on('click', () => {
        window.open(node.url)
      })
      $li.on('click', '.close', (e) => {
        e.stopPropagation() // 阻止冒泡
          hashMap.splice(index, 1)
          render();
      })
    })
}

render();

$(".addButton")
    .on("click", () => {
        let url = window.prompt("添加网址")
        if (url.indexOf("http") !== 0) {
            url = "https://" + url
        }
        console.log(url)
        hashMap.push({
            logo: removeX(url)[0].toUpperCase(), logoType: "image", url: url
        });
        $($siteList.find("li:not(.last)").remove()) //使用$在siteList中寻找li标签，唯独不要last
        
        render();
    })


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)   //把hashMap这个对象转换成字符串
    localStorage.setItem("x", string)  //把hashMap以字符串的形式存到localStorage中的x
}
$(document).on("keypress", (e) => {
  const { key } = e
  console.log(e)
  for (let i = 0; i < hashMap.length; i++) {
    if ((hashMap[i].logo.toLowerCase() === key))
      window.open(hashMap[i].url)
  }
})
