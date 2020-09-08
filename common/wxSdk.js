import axios from 'axios'
var Share = {};


function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}


let isRead = false
const init = async () => {
var _pageData = window._pageData

    if(!isWeiXin()){
        return
    }
    Share={
        title: '',
        link: window.location.href,
        desc:  '找月嫂到',
        imgUrl: '//static.mumway.com/common/image/logo512.jpg',
        type: 'link',
        dataUrl: '',
        success: function () {
            console.log('分享ok');
    
        },
        cancel: function () {
            console.log('分享null');
        }
    }

    if(_pageData&&_pageData.shareConfig){
      let default_img = "http://static-mumway.oss-cn-zhangjiakou.aliyuncs.com/NetworkFrontEnd/ljs/fengmian.png"
        let img_url =  _pageData.shareConfig.coverImage
        let obj = {
            title:_pageData.shareConfig.title ||'',
            desc:_pageData.shareConfig.description ||'',
            imgUrl:(img_url&&img_url.indexOf('http')!=-1 ? img_url :( img_url?`http:${img_url}`: default_img))
        }
        Share = {
          ...Share,
          ...obj
        }
    }
    if (!isRead) {
        let _data = await axios.get(`/wechat/wechat?url=${window.location.href}`)
        _data = _data.data.body
        wx.config({
            debug: false,
            appId: _data.appId,
            timestamp: _data.timestamp,
            nonceStr: _data.nonceStr,
            signature: _data.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'previewImage']
        });
        wx.ready(() => {
            isRead = true
        }
        );
        wx.error((res) =>{
            console.log('验证失败');

        });
        return true
    }else{
        return true
    }

}

export async function WxShare() {
    await init()
    wx.ready(() => {
        isRead = true
        wx.onMenuShareTimeline(Share);
        wx.onMenuShareAppMessage(Share);
        wx.onMenuShareQQ(Share);
        wx.onMenuShareWeibo(Share);
        wx.onMenuShareQZone(Share);
    })
}

export async function WxPreviewImage(url, urls) {
    await init()

    if (url) {
        wx.ready(() => {
            isRead = true
            wx.previewImage({
                current: url,
                urls: urls || [url]
            })
        })
    }
}