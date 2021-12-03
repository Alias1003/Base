$(function () {
    var n = 1;
    $(".add").click(function (e) {
        n++;
        $("input[type='text']").val(n+"间");
    });
    $(".sub").click(function (e) {
        n--;
        if(n<=0){
            n=1;
        }
        $("input[type='text']").val(n+"间");
    });
    
})
