$(function(){
})
function login(){
    var res = check();
    if (res) {
        console.log('login')
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