function Index() {
  var _this = this;
  var firstData = [
    { id: '1', name: '1-1' },
    { id: '2', name: '1-2' },
    { id: '3', name: '1-3' },
    { id: '4', name: '1-4' },
    { id: '5', name: '1-5' },
    { id: '6', name: '1-6' },
    { id: '7', name: '1-7' },
    { id: '8', name: '1-8' },
    { id: '9', name: '1-9' },
    { id: '10', name: '1-10' },
    { id: '11', name: '1-11' },
    { id: '12', name: '1-12' },
  ];
  var secondData = [
    { id: '1', name: '2-1' }
  ];

  this.initPage = function() { // 页面初始化
    // 计算list-box高度
    var totalHeight = window.innerHeight;
    var barHeight = totalHeight - 204;
    $('.list-box').height(barHeight);

    // 创建一级目录对象
    var firstList = new buildLIst($('#first ul'), {
      label: 'first',
      handleClick: function() {
        firstListClick();
      }
    });
    // 创建二级目录对象
    var secondList = new buildLIst($('#second ul'), {
      label: 'second',
      handleClick: function(id) {
        secondListClick(id);
      }
    });

    // 渲染一级目录
    firstList.render(firstData);

    // 全部刷新
    $('#btn').bind('click', function() {
      firstList.render(firstData); // 渲染一级目录
      buildSecondList(); // 渲染二级目录
    })

    // 一级目录点击处理函数
    var firstListClick = function() {
      var number = secondData.length + 1;
      secondData.push({ id: number + '', name: '2-' + number });
      buildSecondList();
    };

    // 二级目录点击处理函数
    var secondListClick = function(id) {
      $('.content').text('当前选中节点：' + id)
    };

    // 二级目录渲染函数，拿到数据后默认加载第一个
    var buildSecondList = function() {
      if (secondData.length) {
        secondList.render(secondData);
        $('.content').text('当前选中节点：' + secondData[0].id)
      }
    };
    // 渲染二级目录
    buildSecondList();
  };
}
