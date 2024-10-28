TODO:

- hl-date：type=range增加校验
- 上传组件增加可同时选择多个文件
- 上传组件增加上传失败处理

- hl-block-title：样式太丑，增加平面样式
- hl-block-title：color和fonts-size不生效

### 0.7.0

- 增加远程下拉组件hl-select-remote
- hl-button的button-type为text时，禁止换行
- hl-context-menu：页面出现滚动条时显示位置不在点击位置
- hl-dialog：修复margin-bottom导致外部滚动条
- hl-icon-selecet：修复第二次打开弹框选择卡顿问题
- hl-page：v-model:page变更为v-model(break-change)
- hl-del-button：修复幽灵空白节点

### 0.6.3

- hl-icon-select：修复样式失效问题

### 0.6.2

- 为所有inject添加默认值
- hl-icon-select：增加teleported、width、trigger属性

### 0.6.1

- hl-wavesurfer：修复样式文件缺失问题；修复z-index不够导致的覆盖问题
- hl-preview：no-download属性合并到no-preview(break-change)
- hl-image：not-preview变更为no-preview(break-change)
- hl-icon-select：增加清除和确定操作
- 增加自动按需引入配置文件：resolver.js
- hl-search-page优化fixedButton属性
- hl-radio 修复readonly=true时点击选中文本消失问题

### 0.5.22

- hl-dialog：修复部分情况下 .hl-custome-dialog 样式被覆盖问题
- hl-upload：修复当type=all时，指定的suffix冲突问题
- hl-upload：去除preview属性，增加no-preview属性
- hl-upload：自定义预览样式插槽中没有传递文件列表以及相关操作

### 0.5.21

- hl-context-menu 修复样式缺失问题

### 0.5.20

- hl-table 优化hl-table-column鼠标悬浮提示

### 0.5.18

- hl-checkout修复无法选中问题

### 0.5.14

- theme-chalk版本同步0.5.14
- hl-nodata 修复width和height属性不生效问题
- hl-select modelValue类型增加Boolean
- hl-checkbox 修复卡死问题
- 修复hl-checkbox只读模式，在多选情况下选项显示不全问题

### 0.5.13

- hl-select的disabledOptions属性增加类型Number
- hl-icon-select修复vBottom指令缺失

### 0.5.12

- 引入@hl/directions模块，hl-select的v-loadmore替换从改包引入
- hl-select 修复只读模式现在还能选择问题

### 0.5.8

- hl-selct、hl-radio、hl-checkbox 增加只读属性readonly，只读模式只展示选中的label
