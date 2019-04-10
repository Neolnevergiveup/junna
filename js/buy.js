// 加一
function plus() {
    var num = parseInt($('#amount').val());
    num++;
    $('#amount').attr('value', num)
}
// 减一
function reduce() {
    var num = parseInt($('#amount').val());
    num--;
    if (num >= 0) {
        $('#amount').attr('value', num)
    }
}
// 前往支付
function goPay(){
    window.location.href = './pay.html'
}