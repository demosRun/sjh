function scrollIntoView () {
  window.scrollTo(0, 0)
}

// 阻止微信拖动
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false})

setTimeout(() => {
  autoScale({
    deviseW: 750,
    deviseH: 1508,
    center: 'middle',
    scroll: false,
    type: 'scale',
    box: '.scale-box'
  })
}, 100);

var dianzan = 5162
$.ajax({
  type: 'get',
  url: 'http://h5.people.com.cn/interface/zan/index',
  cache: false,
  dataType: 'jsonp',
  jsonp: 'callback',
  jsonpCallback: 'IndexForum',
  async: false,
  success: function success(data) {
    console.log(data)
  },
  error: function error(e) {
    console.log(e)
  }
});