function scrollIntoView () {
  window.scrollTo(0, 0)
}

// 阻止微信拖动
// document.body.addEventListener('touchmove', function (e) {
//   e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
// }, {passive: false})
window.autoScaleOnLoad = function () {
  autoScale({
    deviseW: 750,
    deviseH: 1508,
    center: 'middle',
    scroll: false,
    type: 'scale',
    box: '.scale-box'
  })
  setTimeout(() => {
    
  }, 100);
  document.body.style.opacity = 1
  setTimeout(() => {
    document.body.style.opacity = 1
  }, 1000);
}

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
    dianzan = data.number || 5162
  },
  error: function error(e) {
    console.log(e)
  }
});


var mdata = {};
var m_postfid;
// 默认选择其他
var m_domianId = 16; //

var m_subject;
var m_content;
var m_truename;
var m_linktel;
var m_fid; //

var m_code;
var m_hiddenRemark;
var m_typeid;
var leader;
var m_address;
var m_huati;

function getCode(phoneNumber, buttonEL) {
  if (!phoneNumber || phoneNumber.length !== 11) {
    alert('电话号码填写不正确!');
    return
  }

  $.ajax({
    type: 'post',
    async: false,
    url: 'http://liuyan.people.com.cn/topicThreads/getPhoneVarCode',
    dataType: 'json',
    crossDomain: true,
    data: {
      phoneNum: phoneNumber
    },
    success: function success(data) {
      if (data.result == 'fail') {
        alert('发送失败');
      } else {
        alert('发送成功');

        if (buttonEL) {
          buttonEL.classList.add('sending');
          setTimeout(function() {
            buttonEL.classList.remove('success');
          }, 60000);
        }
      }
    },
    error: function error() {
      log('fail');
    }
  });
} // 设置话题


function sethuati(val) {
  m_huati = val;
  createDomian(domianData, val)
} // 设置分类


function setDomianId(val) {
  m_domianId = val;
} 
//留言提交
var domianData = [{
  key:81,
  value:[{id:7,val:"城建"},{id:6,val:"交通"},{id:9,val:"三农"},{id:12,val:"医疗"},{id:5,val:"旅游"},{id:20,val:"金融"},{id:4,val:"企业"}]
},
{
  key:82,value:[{id:14,val:"教育"},{id:12,val:"医疗"},{id:4,val:"企业"}]
},
{
  key:83,value:[{id:12,val:"医疗"}]
},
{
  key:84,value:[{id:1,val:"治安"},{id:2,val:"政务"}]
},{
  key:85,
  value:[{id:4,val:"企业"},{id:2,val:"政务"}]
},
{
  key:86,value:[{id:9,val:"三农"}]
},
{
  key:87,value:[{id:11,val:"就业"}]
},
{
  key:88,value:[{id:2,val:"政务"}]
},{
  key:89,
  value:[{id:14,val:"教育"}]
},
{
  key:90,value:[{id:12,val:"医疗"}]
},
{
  key:91,value:[{id:7,val:"城建"}]
},
{
  key:92,value:[{id:13,val:"环保"}]
},{
  key:93,
  value:[{id:9,val:"三农"},{id:11,val:"就业"},{id:2,val:"政务"}]
},
{
  key:94,value:[{id:9,val:"三农"},{id:5,val:"旅游"}]
},
{
  key:95,value:[{id:14,val:"教育"},{id:12,val:"医疗"}]
},
{
  key:96,value:[{id:6,val:"交通"}]
}

]
function createDomian(domian, pid) {
  console.log(pid)
  var $domain = $('#domain');
  $domain.html("");
  var r = [];
  for(let i = 0; i < domian.length; i++){
    if(domian[i].key == pid){
      r= domian[i].value
  m_domianId = r[0].id
      console.log(r)
  console.log("m_domianId",m_domianId)
    }
  }
  var STR = '';
  for (var k = 0; k < r.length; k++) {
    var nowR = r[k];
    STR += '<option value=' + nowR.id + '>' + nowR.val + '</option>';
  }
  $domain.html(STR);
}

function sendMessage() {
  m_content = $('#mcontent').val();
  m_truename = $('#username').val();
  m_linktel = $('#tel').val();
  m_subject = $('#subject').val();
  m_code = parseInt($('#code').val());
  m_hiddenRemark = $('#hiddenRemark').val();
  mdata = {
    topicId: m_huati,
    typeId: 5,
    domainId: m_domianId,
    Fid: m_fid,
    subject: m_subject,
    content: m_content,
    realName: m_truename,
    phone: m_linktel,
    varCode: m_code,
    hiddenRemark: m_hiddenRemark
  };
  var defaultUrl = window.location.href;
  var codeArray = defaultUrl.split("=")[1];

  if (m_domianId && m_huati && m_fid && m_subject && m_content && m_truename && m_linktel && m_code) {
    $.ajax({
      type: 'post',
      url: 'http://liuyan.people.com.cn/topicThreads/huoDongPost?code=' + codeArray,
      data: mdata,
      crossDomain: true,
      dataType: 'json',
      // jsonp: "callback",
      // jsonpCallback: "wangqizheng",
      success: function success(data) {
        if (data.result == 'success') {
          alert('提交留言成功！');
          $('#mcontent').val('');
          $('#username').val('');
          $('#tel').val('');
          $('#subject').val('');
          $('#code').val('');
          owo.go({
            page: 'page7',
            noBack: false,
            inAnimation: 'scaleDown',
            outAnimation: 'scaleUpDown'
          });
        }

        var code = data.error;

        if (code == 'T0001') {
          alert('提交失败，您输入的信息不完整');
        } else if (code == 'T0002') {
          alert('提交失败，请确定您选择的留言版块是否正确');
        } else if (code == 'T0003' || code == 'T0004') {
          alert('提交失败，请确定您输入的分类或领域等信息是否正确');
        } else if (code == 'T0005') {
          alert('提交失败，您留言的话题活动已经结束');
        } else if (code == 'T0006') {
          alert('提交失败，请确定您的留言来源是否正确');
        } else if (code == 'T0007') {
          alert('提交失败，留言状态错误');
        } else if (code == 'T0008') {
          alert('提交失败，请检查留言标题是否符合要求');
        } else if (code == 'T0009') {
          alert('提交失败，请检查留言内容是否符合要求');
        } else if (code == 'T0010') {
          alert('提交失败，您输入的内容中包含了禁止词语');
        } else if (code == 'T0011') {
          alert('提交失败，请不要频繁发表留言');
        } else if (code == 'T0012') {
          alert('提交失败，您没有权限进行此操作');
        } else if (code == 'T0013') {
          alert('提交失败，您输入的验证码错误');
        }
      },
      error: function error(data) {}
    });
  } else {
    alert('请将表格填写完整');
  }
} // 选择省


function setProId(val) {
  var pid = val; //var localUrl = 'http://leaders.people.com.cn/liuyan_data/forum/forum_data_' + pid + '.jsonp';

  var localUrl = 'http://messageboard.peopletech.cn/forum_data_' + pid + '.jsonp';
  $.ajax({
    type: 'get',
    url: localUrl,
    cache: false,
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'IndexForum',
    async: false,
    success: function success(data) {
      leader = data;
      createLeader(leader, pid);
    },
    error: function error() {}
  });
} // 选择类型


function setTypeId(val) {
  m_typeid = val;
}

function setLeaderId(val) {
  m_fid = val;
}

function createLeader(leader, pid) {
  var $leader = $('#leader');
  $leader.html('');
  var LEN = 2;
  var r = [];
  var lArr = leader[pid].childIds;
  LEN = pid == 38 || pid == 39 ? 1 : 2;

  for (var i = 0; i < LEN; i++) {
    var oIndex = lArr[i];
    var oLeader = leader[oIndex];
    r.push(oLeader);
  }

  var STR = "<option style=\"color: #b6b6b6\" disabled selected>\u8BF7\u9009\u62E9</option>";

  for (var k = 0; k < r.length; k++) {
    var nowR = r[k];
    STR += '<option value="' + nowR.fid + '" topIds="' + nowR.topIds + '">' + nowR.name + '</option>';
  }

  $leader.html(STR);
}