# 统一用户通用组件
> 由于统一用户的业务属性较强，所以需要和主程序之间建立以下几个约定

+ window.hl 下必须挂载项目的request实例对象(目前是axios实例对象)，对象名为http
+ pinia下必须包含useUserStore模块
+ 人员选择展开优化下拉加载更多