(function ($) {

    $.dialog = function () {};

    var dialog = $.dialog;

    var dialogClassName = '.pop';

    // Dialog模板
    var TEMPLATE = [
        '<div class="pop pop_tip" style="width: 100%; background: url(/static/main/images/bg_b.png); height: 100%; position: fixed; left: 0; top: 0; z-index: 4000;">',
        '<div class="pop_box" style="background: #fff; position: absolute; width: 400px; top: 50%; left: 50%; margin-left: -200px; margin-top: -200px; border: 1px solid #dcdbdb;">',
        '<h2 style="line-height: 40px; height: 40px; font-size: 14px; font-weight: 700; border-bottom: 1px solid #dcdbdb; padding: 0 15px; text-align: left"></h2>',    
        '<center><p align="center" style="line-height: 25px; font-size: 14px; text-align: left; padding: 20px 30px 10px; display: inline-block; max-width: 300px; word-break: break-all;"></p></center>',
        '<div class="pop_button" style="text-align: center">',
        '<input type="button" value="" class="confirmBtn button bor_radius" style="padding: 0 30px; text-align: center; color: #fff; line-height: 35px; height: 35px; margin: 10px; font-size: 14px; border: 0; overflow: hidden; background: #ff6602" />',
        '<input type="button" value="" class="cancelBtn button bor_radius" style="padding: 0 30px; text-align: center; color: #fff; line-height: 35px; height: 35px; margin: 10px; font-size: 14px; border: 0; overflow: hidden; background: #ff6602" />',
        '</div>',
        '</div>',
        '</div>'].join("");

    /**
     * 显示dialog
     * @param options
     */
    dialog.show = function (options) {
        if($("body").find(dialogClassName).size()) {
            dialogObj.remove();
        }
        if (typeof options === 'string') {
            options = {
                content: options
            }
        }
        var defaults =  {
            title: '提示',
            content: '...',
            url: '',
            confirmBtnText: '确定',
            cancelBtnText: ''
        }
        var opts = $.extend(defaults, options);
        dialogObj = $(TEMPLATE);
        dialog.create(opts);
    }

    /**
     * 创建dialog
     * @param opts
     */
    dialog.create = function (opts) {
        dialog.setTitle(opts.title);
        dialog.setContent(opts.content);
        dialog.setConfirmBtnText(opts.confirmBtnText);
        dialog.setCancelBtnText(opts.cancelBtnText);
        dialog.createDialog();

        dialogObj.find(".confirmBtn").off().on("click", function() { // 设置确定按钮的点击事件
            if(typeof opts.callback === "function") {
                opts.callback({ // 回调
                    result: true
                });
            }
            dialog.hide();
            if (opts.url) {
                window.location.href = url;
            }
        });

        dialogObj.find(".cancelBtn").off().on("click", function() { // 设置取消按钮的点击事件
            if(typeof opts.callback === "function") {
                opts.callback({ // 回调
                    result: false
                });
            }
            dialog.hide();
        });
    }

    /**
     * html添加dialog
     */
    dialog.createDialog = function() {
        dialogObj.appendTo("body");

        /*dialogObj.find('.pop_box').css({
            top: ($(window).height() - dialogObj.find('.pop_box').outerHeight()) / 2,
            left: ($(window).width() - dialogObj.find('.pop_box').outerWidth()) / 2
        });*/
    }

    /**
     * 隐藏dialog
     */
    dialog.hide = function () {
        dialogObj.remove();
    }

    /**
     * 设置提示标题
     * @param title
     */
    dialog.setTitle = function (title) {
        dialogObj.find("h2").text(title);
    }

    /**
     * 设置提示内容
     * @param content
     */
    dialog.setContent = function (content) {
        dialogObj.find("p").text(content);
    }

    /**
     * 设置确定按钮的文本
     * @param confirmBtnText
     */
    dialog.setConfirmBtnText = function (confirmBtnText) {
        dialogObj.find(".confirmBtn").val(confirmBtnText);
    }

    /**
     * 设置取消按钮的文本
     * @param cancelBtnText
     */
    dialog.setCancelBtnText = function (cancelBtnText) {
        if (cancelBtnText) {
            dialogObj.find(".cancelBtn").val(cancelBtnText);
        } else {
            dialogObj.find(".cancelBtn").remove();
        }
    }
})(jQuery)