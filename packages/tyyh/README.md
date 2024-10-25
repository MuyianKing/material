# 统一用户通用组件

> 由于统一用户的业务属性较强，所以需要和主程序之间建立以下约定

- window.hl 下必须挂载项目的request实例对象(目前是axios实例对象)，对象名为http，用于发送请求

### TODO

### 0.6.2

- person-select-panel：增加已选择人员筛选

### 0.6.1

- person-select：增加label-config属性，可自定义label

### 0.5.11

- PersonSelectPanel修复因全量数据会丢失导致的已选项丢失问题
- PersonSelect 组件增加label-config属性

### 0.5.3

- PersonSelectPanel组件增加默认选中单位属性
- organization/components/plugin组件增加默认选中属性
- PersonSelect组件增加只读属性，针对只读默认优化展示方式
