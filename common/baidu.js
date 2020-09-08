let id = '';
if (document.getElementById("baidu_id")) {
    id = document.getElementById("baidu_id").getAttribute("id");
}
window._agl = window._agl || [];
(function () {
    _agl.push(
        ['production', id]
    );
    (function () {
        var agl = document.createElement('script');
        agl.type ='text/javascript';
        agl.async = true;
        agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js?production=' + id;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(agl, s);
    })();
})();
