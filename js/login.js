function login(){
    var res = check();
    if (res) {
        $.post(URL + "/buy/index/login", {
            code: $('.account').val(),
            pwd: $('.pwd').val(),
            open_id: localStorage.open_id
        }, function(res, status){
            if ('success' == status) {
                if (res.code === 0) {
                    $('body').toast({
                        content:'成功!',
                        duration:2000,
                    });
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
// 获得参数code
function getUrlParam(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2])
    return null
}
// 由code获得openid
function getOpenId(code){
    $.get(URL + "/buy/index/getOpenId?code=" + code,function(res,status){
        if ('success' == status) {
            if (res.code === 0) {
                localStorage.setItem('open_id', res.data.open_id)
            } else {
                $('body').toast({
                    content:res.msg,
                    duration:2000,
                });
            }
        } else {
            $('body').toast({
                content:'请求行业列表失败',
                duration:2000,
            });
        }
    });
}
$(function(){
    // 获取code
    const appid = 'wx679a63f8ef2a7591';
    const url = window.location.href;
    const code = getUrlParam('code');
    if (code == null || code === '') {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+encodeURIComponent(url)+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
    } else {
        getOpenId(code)
    }
})