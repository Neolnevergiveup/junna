var num = ''
var price = ''
var total = ''
$(function(){
    price = getQueryString('price');
    num = getQueryString('num');
    total = getQueryString('total');
    $('#price').html(total);
    $('#amount').html('共计' + num + '人/份');
})
// 返回首页
function back(){
    window.location.href = './buy.html'
}
// 获取url参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
// 去重新修改订单
function goBackAlter() {
    window.location.href = './buy.html';
}
// 在线支付}
function payOnline(){
    var url = encodeURIComponent(window.location.href.split('#')[0]);
    $.get(URL + "/buy/order/create?pay_type=wechat_sdk&unit_price="+price+'&url='+url+'&open_id='+localStorage.open_id+'&count='+num+'&total_price='+total, function(res,status){
        if ('success' == status) {
            if (res.code === 0) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.wx.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.wx.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.wx.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.wx.signature,// 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
                });
                wx.chooseWXPay({
                    timestamp: res.data.wx.timeStamp, // 支付签名时间戳
                    nonceStr: res.data.wx.nonceStr, // 支付签名随机串，不长于32 位
                    package: res.data.wx.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: res.data.wx.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: res.data.wx.paySign, // 支付签名
                    success: function (res) {
                        //支付成功
                        $('body').toast({
                            content:'支付成功!',
                            duration:1000,
                        });
                        setTimeout(function(){
                            window.location.href = './index.html';
                        },1000)
                    },
                    cancel: function (res) {
                        //支付取消
                        $('body').toast({
                            content:'支付失败!',
                            duration:2000,
                        });
                    }
                });
            } else {
                $('body').toast({
                    content:res.msg,
                    duration:2000,
                });
            }
        } else {
            console.log('请求失败');
        }
    });
}
// 打开银行转账的弹窗
function openPayByCardWin(){
    $.get(URL + "/buy/order/getinfo", function(res,status){
        if ('success' == status) {
            if (res.code === 0) {
                $('.mask').show();
                $('#info').html(res.data.tips);
                var str = ''
                var list = res.data.list
                for(var i = 0; i < list.length; i++) {
                    str += "<p class='line'>" + list[i].name + "：" + list[i].value + "</p>"
                }
                $('#lineWrap').html(str);
            } else {
                $('body').toast({
                    content:'请求失败',
                    duration:2000
                });
            }
        } else {
            console.log('请求失败');
        }
    });
}
// 关闭银行转账的弹窗
function closeMask(){
    $('.mask').fadeOut();
}
// 银行转账
function payByCard(){
    $.get(URL + "/buy/order/create?pay_type=card&unit_price="+price+'&open_id='+localStorage.open_id+'&count='+num+'&total_price='+total, function(res,status){
        if ('success' == status) {
            if (res.code === 0) {
                $('.mask').fadeOut();
            } else {
                $('body').toast({
                    content:'请求失败',
                    duration:2000
                });
            }
        } else {
            console.log('请求失败');
        }
    });
}