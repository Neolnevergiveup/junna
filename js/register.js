$(function(){
    // 请求企业行业列表和注册页面标题
    (function(){
        $.get(URL + "/buy/index/register",function(res,status){
            if ('success' == status) {
                if (res.code === 0) {
                    $('#title').text(res.data.title);
                    var innerHtml = '<option value="">请选择</option>'
                    var list = res.data.industry;
                    for (var i in list) {
                        innerHtml += "<option value='" + list[i] + "'>" + list[i] + " </option>"
                    }
                    $('#hangye').html(innerHtml)
                } else {
                    $('body').toast({
                        content:res.msg,
                        duration:2000,
                    });
                }
            } else {
                $('body').toast({
                    content:'请求失败',
                    duration:2000,
                });
            }
        });
    })()
})
// 将多个空格转换成一个空格，避免取出城市出错
String.prototype.ResetBlank=function(){
    var regEx = /\s+/g;
    return this.replace(regEx, ' ');
};
// 企业执行注册
function save(){
    var params = {}
    $($('.form1').serializeArray()).each(function(index, item){
        params[item.name] = item.value
    })
    $($('.form2').serializeArray()).each(function(index, item){
        params[item.name] = item.value
    })
    var str = $('#expressArea').val().ResetBlank();
    var cityList = str.split(' ');
    var city1 = cityList[cityList.length-2];
    var country1 = cityList[cityList.length-1];
    if (cityList.length === 3) {
        var province1 = cityList[0];
    }
    Object.assign(params, {
        province: province1,
        city: city1,
        county: country1
    })
    // 省市区手动切
    $.post(URL + "/buy/index/doregist", params, function(res, status){
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
// 跳转登录，因为公众号对两个页面的相互跳转次数有限制
function jumpLogin(){
    var timestamp = Date.parse(new Date());
    window.location.href = './login.html?time=' + timestamp;
}
