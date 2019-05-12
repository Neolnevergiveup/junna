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
    Object.assign(params, {
        province: provinceName,
        city: cityName,
        county: coutyName
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
// 定义城市选择需要的变量
var provinceName = ''
var cityName = ""
var coutyName = ""
var nowSel = '' // 当前是选择省、市、区的哪一种
// 开始选择城市
function handleSel(){
    $('#cityName').html('请选择公司地址')
    $('#mask').css("display", 'block')
    $('.selectCityWrap .back').css('display', 'none')
    // 设置list为省列表
    setProvinceList()
    $('#cityList').scrollTop(0)
}
// 设置list为省列表
function setProvinceList(){
    nowSel = '省'
    var str = ''
    for (var i = 0; i < province.length; i++) {
        str += "<li onclick='selProvince(\"" + province[i] + "\")'>" + province[i] + "</li>"
    }
    $('#cityList').html(str);
}
// 设置list为第i个省的city列表
function setCityList(j) {
    nowSel = '市'
    var str = ''
    for (var i = 0; i < city[j].length; i++) {
        str += "<li onclick='selCity(\"" + city[j][i] + "\")'>" + city[j][i] + "</li>"
    }
    $('#cityList').html(str);
}
// 设置list为第a省第b城市的county列表
function setCountyList(a, b){
    nowSel = '区'
    var list = district[a][b]
    var str = ''
    for (var i = 0; i < list.length; i++) {
        str += "<li onclick='selCouty(\"" + list[i] + "\")'>" + list[i] + "</li>"
    }
    $('#cityList').html(str);
}
// 选中某个省
function selProvince(name){
    provinceName = name
     $('.selectCityWrap .back').css('display', 'block')
     // 查找当前选中第几个省
     var i = getProvinceIndex(name)
     setCityList(i)
     $('#cityList').scrollTop(0)
}
// 选中某个城市
function selCity(name){
    cityName = name
    var provinceIndex = getProvinceIndex(provinceName)
    var cityIndex = getCityIndex(name)
    // 设置list为第i省第j城市的county列表
    setCountyList(provinceIndex, cityIndex)
    $('#cityList').scrollTop(0)
}
// 
function selCouty(name){
    coutyName = name
    $('#mask').css('display', 'none')
    $('#cityName').html(provinceName + '' + cityName + '' + coutyName)
}
// 查找当前选中第几个省
function getProvinceIndex(name){
    for(var i = 0; i < province.length; i++) {
        if (province[i] == name) {
            return i
        }
    }
}
// 查找当前选中第几个城市
function getCityIndex(name){
    var provinceIndex = getProvinceIndex(provinceName)
    if (typeof(provinceIndex) == 'number') {
        for (var i = 0; i < city[provinceIndex].length; i++) {
            if (cityName == city[provinceIndex][i]) {
                return i
            }
        }
    } else {
        console.log('找不到province下标')
    }
}
// 关闭选择地区弹窗
function closeMask(){
    $('#mask').css('display', 'none')
    provinceName = ''
    cityName = ""
    coutyName = ""
}
// 根据nowSel返回上一层
function goBack(){
    if (nowSel == '市') {
        setProvinceList()
    } else if (nowSel == '区') {
        var i = getProvinceIndex(provinceName)
        setCityList(i)
    }
     $('#cityList').scrollTop(0)
}