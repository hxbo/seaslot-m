// 通用插件
// Author:Hexiaobo

//打开自动初始化页面的功能
//建议不要打开自动初始化，而是自己调用 $.init 方法完成初始化
/*$.config = {
    // 路由功能开关过滤器，返回 false 表示当前点击链接不使用路由
    routerFilter: function($link) {
        // 某个区域的 a 链接不想使用路由功能
        if ($link.is('#userinfo_tab a,.buttons-row a,.disable-router a,.disable-router')) {
            return false;
        }

        return true;
    }
};*/

$.config = {router: false};

$(function (e) {
    $(".game-filter a").on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active")
    })
});


$(function () {
    $(document).on('click', '.confirm-ok', function () {
        $.confirm('您确定要退出该账户吗？', function () {
            $.alert("已退出", function () {
                window.location.href = "login.html";
            });

        });
    });

    //密码显示切换
    $(".i-eye-open").on("click", function () {

        let $pwd = $(this).prev();
        if ($(this).hasClass("active")) {
            $pwd.prop("type", "password");
            $(this).removeClass("active")
        } else {
            $pwd.prop("type", "text");
            $(this).addClass("active")
        }
    });
});

//有顶部下载  20201116
let hasAppDown = function () {
    setTimeout(function () {
        let $appDown = $(".app-down");
        $appDown.show();
        let appDownHeight = $appDown.height();
        let headerHeight = $("header.bar").height();
        $(".page-current").addClass("has-app-down");
        $(".has-app-down .content").css("top", appDownHeight + headerHeight);
    }, 0)
};
$(document).on('click', '.icon-close', function () {
    $(this).parent().remove();
    hasAppDown();
    $(".page-current").removeClass("has-app-down");
});

//未登录
let unlogin = function () {
    $('.nav-before-login').show();
    $('.bar-tab').hide();
};




//客服操作表
$(document).on('click', '.icon-service', function () {
    var buttons1 = [
        /*{
            text: '请选择',
            label: true
        },*/
        {
            text: '在线客服',
            //bold: true,
            color: 'main',
            onClick: function () {
                window.location.href = "service.html"
            }
        },
        {
            text: '微信客服',
            color: 'main',
            onClick: function () {
                var popupHTML = '<div class="popup">' +
                    '<div class="content-block">' +
                    '<h4></h4>' +
                    '<p style="font-size: .8rem;">输入您的微信号，我们将在1分钟内加您微信</p>' +
                    '<div class="login-wrap" style="background: none;padding: 0 0;">' +
                    '<form  action="" method="post">' +
                    '<div class="row" style="overflow: inherit">' +
                    '<input autocomplete="off" class="login-input" type="text" name="wxid"  id="wxid" placeholder="请输入您的微信号" >' +
                    '</div>' +
                    '<p><button class="button button-fill button-warning" style="display: block;width: 100%;line-height: 1.6rem;height: 1.6rem;" type="button" id="popSubmitBtn" >立即提交</button></p>' +
                    '</div><p><a href="#" class="close-popup">关闭</a></p>' +
                    '</div>' +
                    '</div>';
                $.popup(popupHTML);
            }
        },
        {
            text: '电话回拨',
            color: 'main',
            onClick: function () {
                var popupHTML = '<div class="popup">' +
                    '<div class="content-block">' +
                    '<h4></h4>' +
                    '<p style="font-size: .8rem;">输入您的联系电话，我们将在1分钟内给您回电</p>' +
                    '<div class="login-wrap" style="background: none;padding: 0 0;">' +
                    '<form  action="" method="post">' +
                    '<div class="row" style="overflow: inherit">' +
                    '<input autocomplete="off" class="login-input input-phone" tabindex="1"  type="tel" name="phone" maxlength="12" id="phone" placeholder="请填写正确的手机号码" >' +
                    '</div>' +
                    '<p><button class="button button-fill button-warning" style="display: block;width: 100%;line-height: 1.6rem;height: 1.6rem;" type="button" id="popSubmitBtn" >立即提交</button></p>' +
                    '</div><p><a href="#" class="close-popup">关闭</a></p>' +
                    '</div>' +
                    '</div>';
                $.popup(popupHTML);

            }
        }
    ];
    var buttons2 = [
        {
            text: '取消',
            color: 'black',
            //bg: 'danger'
        }
    ];
    var groups = [buttons1, buttons2];
    $.actions(groups);
});

//客服表单验证
$(document).on("click", "#popSubmitBtn", function () {
    var $form = $(this).parents("form"),
        $wxid = $form.find("#wxid"),
        $phone = $form.find("#phone");
    if ($wxid.length) {
        if ($wxid.val().trim() === "") {
            $.toast("微信号不能为空！", 1000, 'error-tip top-tip');
            return false;
        }
    }
    if ($phone.length) {
        if ($phone.val().trim() === "") {
            $.toast("手机号不能为空！", 1000, 'error-tip top-tip');
            return false;
        }
        if (!(/^1[34578]\d{9}$/.test($phone.val()))) {
            $.toast("请填写正确的手机号！", 1000, 'error-tip top-tip');
            return false;
        }
    }
    $.toast("提交成功。", 1000, 'error-tip top-tip');
    setTimeout(function () {
        $form.submit();
    }, 1000)

});

//网站配置
let win8WapSetting = {
    //首页优惠广告 20200321
    indexImgAd(imgUrl,linkUrl){
         let adHtml;
         adHtml = '<div class="index-popup-img-ad-wrap"><a class="imgbox" href="'+ linkUrl +'" target="_blank"><img  src="'+imgUrl+'"  /></a><a class="close iconfont icon-guanbi1" href="javascript:void(0)"></a></div>';
        $('body').append(adHtml);
        $(document).on('click','.index-popup-img-ad-wrap .close',function(){
            $('.index-popup-img-ad-wrap').remove();
        })
    },
    //浮动客服 20200512
    /*floatService(option){
        let serviceHtml;
        serviceHtml = '<div class="float-service" style="position: fixed;z-index: 2002;'+ option.position +':10px;bottom: 3.2rem;"><a href="'+ option.linkUrl +'" target="_blank" style="width:'+ (option.size+16) +'px;height: '+ (option.size+16) +'px;border-radius: 50%;background-color: #fff;overflow: hidden;display: block;padding: 6px;box-shadow: 3px 3px 8px rgba(0,0,0,0.2);border: 2px solid #f6946d;"><img src="images/icon-service-128.png" height="'+ option.size +'" width="'+ option.size +'" /></a></div>';
        $('body').append(serviceHtml);
    },*/
    //浮动转盘
    fixedIcon() {
        let fixedIconHtml = [
            //第1个浮动
            '<a href="mall/mall-index.html" class="fixed-icon"><img class="fixed-icon-words" src="images/words.png"  width="68"/><img class="fixed-icon-turntable" src="images/turntable.png"  width="53"/></a>'
            //第2个浮动
            , '<a href="user-center.html" class="fixed-icon"><img src="images/float-sign.png"  width="70"/></a>'
            //第3个浮动 20200221
            , '<a href="user-center.html" class="fixed-icon"><img src="images/float-golden-coin-mall.gif"  width="70"/></a>'
        ];
        let fixedIconLen = fixedIconHtml.length,
            fixedIconIndex = 0;
        $('body').append(fixedIconHtml[fixedIconIndex]);
        if (fixedIconLen > 1) { //多个悬浮
            fixedIconIndex = 1;
            setInterval(function () {
                $(".fixed-icon").remove();
                $('body').append(fixedIconHtml[fixedIconIndex]);
                fixedIconIndex = fixedIconIndex >= fixedIconLen - 1 ? 0 : fixedIconIndex + 1;
            }, 5000)
        }
    },
    //top 优惠
    topBarAd() {
        let topBarAdHtml = [
            //第1个浮动
            '<a href="#" class="topBarAd"><img src="images/top-ad-first-recharge.gif"/></a>'
            //第2个浮动
            , '<a href="#" class="topBarAd"><img  src="images/top-ad-18-gift.gif" /></a>'
        ];
        let topBarAdLen = topBarAdHtml.length,
            topBarAdIndex = 0;
        $('.bar-nav').append(topBarAdHtml[topBarAdIndex]);
        if (topBarAdLen > 1) { //多个悬浮
            topBarAdIndex = 1;
            setInterval(function () {
                $(".topBarAd").remove();
                $('.bar-nav').append(topBarAdHtml[topBarAdIndex]);
                topBarAdIndex = topBarAdIndex >= topBarAdLen - 1 ? 0 : topBarAdIndex + 1;
            }, 5000)
        }
    },
    //添加app提示
    appAddTip() {
        let appAddTipHtml = '<div class="appAddTip"><img src="images/add-app-tip.png"/><a href="javascript:void(0)" class="close icon-close"></a></div>';
        $('body').append(appAddTipHtml);
        $(document).on('click','.appAddTip>a',function () {
            $(".appAddTip").remove();
        })
    },
    //首页公告弹窗
    indexGonggaoPopup : function () {
        let  $indexGonggaoPopup = $("#indexGonggaoPopup");
        $indexGonggaoPopup.addClass("active");
        $(".close",$indexGonggaoPopup).on('click',function () {
            $indexGonggaoPopup.removeClass("active");
            setTimeout(function(){
                $indexGonggaoPopup.remove();
            },1000)
        });
        $(document).on("click","#indexGonggaoPopup li h4",function(){
            let $title = $(this),
                $li = $title.parents("li");
            if($li.hasClass("active")){
                $li.removeClass("active");
            }else{
                $("#indexGonggaoPopup li").removeClass("active");
                $li.addClass("active")
            }

        })
    },
    //重要通知弹窗 20200509
    noticeAlert:function () {
        let $style = '<style>#noticeAlert{position:fixed;top:0;left:0;width:100%;height:100%;z-index:3000}.notice-alert-wrap{width:100%;height:100%;display:flex;display:-webkit-flex;display:-o-flex;display:-moz-flex;align-items:center;-webkit-align-items:center;justify-content:center;-webkit-justify-content:center}.notice-alert-box{border-radius:10px;width:400px;background-color:#fff;position:relative}@media screen and (max-width:520px){.notice-alert-box{width:90%}.notice-alert-message-content{max-height:600px}}.notice-alert-box h1{font-size:22px;text-align:center;font-weight:normal;padding-bottom:10px;padding-top:10px;border-radius:10px 10px 0 0;margin-top:0;background-color:#caa059;color:#fff;border-bottom:1px solid #f0f0f0}.notice-alert-message-content{max-height:400px;overflow:auto;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:15px}.notice-alert-message-content p{font-size:1.2rem;line-height:1.6em;text-align:justify}.notice-alert-close{position:absolute;right:10px;top:8px;font-size:20px;color: #fff;}</style>',
            $dom='<div id="noticeAlert"><div class="notice-alert-wrap"><div class="notice-alert-box"><a class="notice-alert-close" href="javascript:;" id="noticeAlertClose">X</a><h1>重要通知</h1><div class="notice-alert-message-content"><p>【赢8仅此一家】从无合并，如遇进入游戏时，页面跳转至其他链接，请马上立即第一时间内联系（在线客服）回馈问题。</p><p style="font-size: 12px;color: #f00;padding: 1rem 0 ;text-align: center;">如经核实发现（重大问题），联系客服获得（一笔免费礼金加赠）</p></div></div></div><div style="position: fixed;left: 0;top: 0;height: 100%;width: 100%;z-index: -1;background-color: rgba(0,0,0,0.6);"></div></div>';

        $('body').append($style,$dom);
        var $noticeAlertDom = document.getElementById('noticeAlert');
        $noticeAlertDom.style.display = 'block';
        //关闭
        $(document).on('click','#noticeAlertClose',function () {
            //关闭弹窗
            $noticeAlertDom.style.display = 'none';
        });
    }
};

$(function () {
    //win8WapSetting.fixedIcon();
    //win8WapSetting.topBarAd();



});


//iOS Web APP中点击链接跳转到Safari 浏览器新标签页的问题 devework.com
//stanislav.it/how-to-prevent-ios-standalone-mode-web-apps-from-opening-links-in-safari
if(("standalone" in window.navigator) && window.navigator.standalone){
    var noddy, remotes = false;
    document.addEventListener('click', function(event) {
        noddy = event.target;
        while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
            noddy = noddy.parentNode;
        }
        /*
        * 以下是在webapp内部跳转的逻辑
        * noddy.href.indexOf(document.location.host) !== -1 点击的链接主机名和当前主机名是否相同，判断是否在同一个域名之下
        * 如果是外部
        * */
        if(('target' in noddy && noddy.target!=='_blank') && ('href' in noddy && noddy.href.indexOf('http') !== -1) && (noddy.href.indexOf(document.location.host) !== -1 || remotes)){
            event.preventDefault();
            document.location.href = noddy.href;
        }
    },false);
}

/*
if('standalone' in window.navigator){
    if(window.navigator.standalone){
        //通过webapp打开

    }
}
*/















 

