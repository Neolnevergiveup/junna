$(function(){
    getData()
})
// 获得页面数据
function getData(){
    $.get(URL + "/buy/index/index?open_id="+localStorage.open_id, function(res,status){
        if ('success' == status) {
            if (res.code === 0) {
                $('#have_buy').html(res.data.history_list.buy_amount)
                $('#learn').html(res.data.history_list.learn_amount)
                $('#pass').html(res.data.history_list.examed_amount)
                $('.buyBtn')[0].innerHTML = res.data.btn_buy
                $('.inviteBtn')[0].innerHTML = res.data.btn_invitation
                $('#expired').html(res.data.user_ttl)
                var list = res.data.course_list || []
                var str = ''
                for(var i = 0; i < list.length; i++) {
                    str += '<div class="every">' +
                        '<div class="every_title">' + list[i].name + '</div>' +
                        ' <div class="content">' + list[i].detail + '</div>' +
                    '</div>'
                }
                $('.list')[0].innerHTML = str;
            } else {
                $('body').toast({
                    content:'请求失败',
                    duration:2000,
                });
            }
        } else {
            console.log('请求失败');
        }
    });
}
// 前往邀请学员
function goInvite(){
    window.location.href = './invite.html';
}