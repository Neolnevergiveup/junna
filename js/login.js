var open_id = ''
function login(){
    var res = check();
    if (res) {
        $.post(URL + "/buy/index/login", {
            code: $('.account').val(),
            pwd: $('.pwd').val(),
            open_id: open_id
        }, function(res, status){
            if ('success' == status) {
                if (res.code === 0) {
                    localStorage.setItem('open_id', open_id)
                    window.location.href = './index.html';
                } else {
                    $('body').toast({
                        content:res.msg,
                        duration:2000,
                    });
                }
            } else {
                $('body').toast({
                    content: '登录失败',
                    duration:2000,
                });
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
// 获得参数code
function getUrlParam(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2])
    return null
}
// 得到code
function getCode(){
    const appid = 'wx679a63f8ef2a7591';
    const url = window.location.href;
    const code = getUrlParam('code');
    if (code == null || code === '') {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+encodeURIComponent(url)+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
    } else {
        getOpenId(code)
    }
}
// 由code获得openid
function getOpenId(code){
    $.get(URL + "/buy/index/getOpenId?code=" + code,function(res,status){
        if ('success' == status) {
            if (res.code === 0) {
                open_id = res.data.open_id;
            } else { // 如果微信报错，就重定向login
                window.location.href = './login.html';
            }
        } else {
            $('body').toast({
                content:'请求open_id失败',
                duration:2000,
            });
        }
    });
}
// input获取焦点，隐藏按钮
function hide(){
    // $('.loginWrap').hide()
}
// input失去焦点，显示按钮
function show(){
    // $('.loginWrap').fadeIn()
}
$(function(){
    // 如果已经有open_id的缓存信息，说明曾经登录过，需要请求后台接口验证open_id当前登录状态；否则获取code，由code获取open_id
    if (localStorage.open_id) {
        // 检验当前open_id
        $.get(URL + "/buy/index/lgcheck?open_id="+localStorage.open_id, function(res,status){
            if ('success' == status) {
                if (res.code === 0) {
                    window.location.href = './index.html';
                } else {
                    localStorage.removeItem('open_id');
                    getCode()
                }
            } else {
                console.log('登录状态验证失败');
            }
        });
    } else{
        getCode()
    }
})