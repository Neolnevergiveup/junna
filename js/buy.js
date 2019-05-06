var price = ''
var totalPrice = 0
// 加一
function plus() {
    var num = parseInt($('#amount').val()) || 0;
    num++;
    $('#amount').val(num)
    cal(num)
}
// 减一
function reduce() {
    var num = parseInt($('#amount').val()) || 0;
    num--;
    if (num >= 0) {
        $('#amount').val(num)
        cal(num)
    }
}
// 返回首页
function back(){
    window.location.href = './index.html'
}
function change(){
    var num = parseInt($('#amount').val());
    $('#amount').val(num)
    cal(num)
}
// 计算价格
function cal(num) {
    var amount = num
    if (!num) {
        $('#amount').val(0)
        amount = 0
    }
    $.get(URL + "/buy/index/getRealPrice?open_id="+localStorage.open_id+"&price="+price+"&count="+amount, function(res,status){
        if ('success' == status) {
            if (res.code === 0) {
                totalPrice = parseFloat(res.data.price)
                $('#money').html(res.data.price)
            } else {
                $('body').toast({
                    content:'价格计算错误',
                    duration:2000,
                });
            }
        } else {
            console.log('获取信息失败');
        }
    });
}
// 前往支付
function goPay(){
    var num = parseInt($('#amount').val());
    if (num) {
        sessionStorage.setItem('num', num)
        window.location.href = './pay.html?num='+num+'&price='+price + '&total=' + totalPrice;
    }
}
$(function(){
    $.get(URL + "/buy/index/comfirmOrder?open_id="+localStorage.open_id, function(res,status){
        if ('success' == status) {
            if (res.code === 0) {
                console.log(res)
                $('#priceTitle').html(res.data.banner.tips)
                $('#price').html(res.data.banner.price)
                $('#unit').html(res.data.banner.spec)
                $('#redInfo').html(res.data.banner.tips)
                var infoList = res.data.bottom_tips.spec
                var str = ''
                for(var i = 0; i < infoList.length; i++) {
                    str += "<p>" + infoList[i] + "</p>"
                }
                $('#content').html(str)
                price = parseFloat(res.data.banner.price)
                var num = sessionStorage.num;
                if (num) {
                    $('#amount').val(num);
                    cal(num);
                }
            } else {
                $('body').toast({
                    content:'请求失败',
                    duration:2000,
                });
            }
        } else {
            console.log('获取信息失败');
        }
    });
})