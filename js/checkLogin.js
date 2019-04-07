$(function(){
    // 检查open_id
    if (!localStorage.open_id) {
        localStorage.removeItem('open_id');
        window.location.href = './login.html';
    } else {
        // 检验当前open_id
        $.get(URL + "/buy/index/lgcheck?open_id="+localStorage.open_id, function(res,status){
            if ('success' == status) {
                if (res.code === 0) {
                } else {
                    localStorage.removeItem('open_id');
                    window.location.href = './login.html';
                }
            } else {
                console.log('登录状态验证失败');
            }
        });
    }
})