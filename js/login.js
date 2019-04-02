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
                    alert(res.msg)
                }
            }
        });
    }
}
// 检查输入
function check(){
    if (!$('.account').val().trim()) {
        alert('请输入企业账号')
        return false
    }
    if (!$('.pwd').val().trim()) {
        alert('请输入密码')
        return false
    }
    return true
}
$(function(){
    // 获取code
    const appid = 'wx679a63f8ef2a7591';
    const url = window.location.href;
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+encodeURIComponent(url)+'&response_type=code&scope=SCOPE&state=STATE#wechat_redirect';
})