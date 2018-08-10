function BindScrollBtn(el) {
  this.upNode = null; // 向上按钮
  this.downNode = null; // 向下按钮
  this.scrollBarHeight = 0; // 滚动框高度
  this.totalHeight = 0; // ul总高度
  this.overUp = 0; // 顶部溢出的高度
  this.overDown = 0; // 底部溢出的高度
  unitHeight = 258; // 单位移动距离，3个li
  var _this = this;

  this.render = function() { // 初始化
    this.upNode = el.parent().next().children('i:eq(0)'); // 向上滚动按钮
    this.downNode = el.parent().next().children('i:eq(1)'); // 向下滚动按钮

    _this.calcOverDown(); // 计算overDown

    _this.updateState(); // 更新状态
  };

  this.calcOverDown = function() {
    // 计算目标容器的高度
    this.scrollBarHeight = el.parent().height();
    this.totalHeight = el.height();
    var deffer = this.totalHeight - this.scrollBarHeight;
    this.overDown = deffer > 0 ? deffer : 0;
  };

  // 更新状态函数
  this.updateState = function() {
    var overUp = el.scrollBtn.overUp;
    var overDown = el.scrollBtn.overDown;
    var upNode = el.scrollBtn.upNode;
    var downNode = el.scrollBtn.downNode;

    if (overDown > 0) {
      if (!upNode.hasClass('up-useful')) {
        upNode.addClass('up-useful');
        upNode.unbind().bind('click', function() {
           _this.goUp();
        });
      }
    } else {
      upNode.removeClass('up-useful');
      upNode.unbind();
    }
    if (overUp > 0) {
      if (!downNode.hasClass('down-useful')) {
        downNode.addClass('down-useful');
        downNode.unbind().bind('click', function() {
          _this.goDown();
        });
      }
    } else {
      downNode.removeClass('down-useful');
      downNode.unbind();
    }
  };

  // 向上滚动
  this.goUp = function() {
    var overDown = el.scrollBtn.overDown;
    var overUp = el.scrollBtn.overUp;

    var upDiffer = overDown - unitHeight; // 底部溢出距离减去单位移动距离
    if (upDiffer > 0) {
      overDown -= unitHeight;
      overUp += unitHeight;

      el.animate({ top: -overUp });
    } else {
      overUp += overDown;
      overDown = 0;
      el.animate({ top: -overUp });
    }
    el.scrollBtn.overDown = overDown;
    el.scrollBtn.overUp = overUp;
    _this.updateState();
  };
  // 向上滚动
  this.goDown = function() {
    var overDown = el.scrollBtn.overDown;
    var overUp = el.scrollBtn.overUp;

    var upDiffer = overUp - unitHeight; // 顶部溢出距离减去单位移动距离
    if (upDiffer > 0) {
      overDown += unitHeight;
      overUp -= unitHeight;
      el.animate({ top: -overUp });
    } else {
      overDown += overUp;
      overUp = 0;
      el.animate({ top: 0 });
    }
    el.scrollBtn.overDown = overDown;
    el.scrollBtn.overUp = overUp;
    _this.updateState();
  };
  // 重置状态
  this.reset = function() {
    el.animate({ top: 0 });
  }
}
