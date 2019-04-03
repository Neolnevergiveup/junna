function login(){
    var res = check();
    if (res) {
        console.log('login')
        $.post(URL + "/buy/index/login", {
            code: $('.account').val(),
            pwd: $('.pwd').val()
        }, function(res, status){
            if ('success' == status) {
                if (res.code === 0) {
                    $('body').toast({
                        content:'成功!',
                        duration:2000,
                    });
                    setTimeout(function(){
                        window.location.href = './login.html';
                    }, 2000)
                } else {
                    $('body').toast({
                        content:res.msg,
                        duration:2000,
                    });
                }
            }
        });
    }
}
// 检查输入
function check(){
    if (!$('.account').val().trim()) {
        $('body').toast({
            content:'请输入企业账号',
            duration:2000,
        });
        return false
    }
    if (!$('.pwd').val().trim()) {
        $('body').toast({
            content:'请输入密码',
            duration:2000,
        });
        return false
    }
    return true
}
var windowHeight = 0
$(function(){
    windowHeight = document.body.clientHeight
    window.onresize = function () {
        if(document.body.clientHeight < windowHeight) {
            $('.loginWrap').hide()
        } else {
            $('.loginWrap').show()
        }
    }
    // 获取code
    const appid = 'wx679a63f8ef2a7591';
    const url = window.location.href;
    // const url = '116.24.66.100';
    console.log(url)
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+encodeURIComponent(url)+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
})
