// function downloadImg(){
//     window.open('./image/code.png');
// }
$(function(){
    getQRCode()
})
// 获取二维码
function getQRCode () {
    $.get(URL + "/buy/index/fetchApplicationCode?open_id="+localStorage.open_id+'&page=pages/login/login', function(res,status){
        if ('success' == status) {
            if (res.code === 0) {
                var url = URL+''+res.data.img;
                $('.code').attr('src', url);
            } else {
                $('body').toast({
                    content:res.msg,
                    duration:2000,
                });
            }
        } else {
            $('body').toast({
                content:'请求二维码失败',
                duration:2000,
            });
        }
    });
}