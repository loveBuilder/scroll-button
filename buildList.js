function buildLIst(el, options) {
  var scrollBtn = null;
  var _this = this;

  $.extend(this, options); // 将参数合并到目录对象

  this.render = function(data) {
    if (!data instanceof Array || !data.length) return;

    if (el.scrollBtn) { // 滚动按钮重置状态
      el.scrollBtn.reset();
    }
    el.empty(); // 清空ul
    el.scrollBtn = null; // 清空ul对象上的滚动按钮对象

    for (var i = 0; i < data.length; i++) {
      var tag = '';
      if (i === 0) tag = 'active';
      el.append("<li class='"+ tag +"' id='"+ data[i].id +"'>"+ data[i].name +"</li>")
    }

    // 绑定点击事件
    el.children('li').bind('click', function() {
      el.children().removeClass('active');
      var id = $(this).attr('id');
      $(this).addClass('active');

      if (_this.label === 'first') {
        _this.handleClick()
      } else if (_this.label === 'second') {
        _this.handleClick(id)
      }
    });

    if (!el.scrollBtn) { // 如果没有绑定滚动按钮对象，执行绑定并初始化
      el.scrollBtn = new BindScrollBtn(el);
      el.scrollBtn.render();
    }
  };
}
