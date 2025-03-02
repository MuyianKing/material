TODO:

- 上传组件增加可同时选择多个文件
- 上传组件增加上传失败处理
- hl-dialog增加header插槽

### 0.7.25

- hl-select-remote：修复单选模式下为初始化问题

### 0.7.24

- 修复删除按钮无法对齐问题

### 0.7.22

- 增加hl-select-remote

### 0.7.21

- hl-reset-button：修复图标显示与其他按钮不一致问题

### 0.7.20

- 增加@hl/ui/utils/custom.ref：自定义Ref
- @hl/ui/utils/custom.ref：增加debounceRef-带防抖的Ref
- hl-dialog：增加css变量--padding用于设置body部分的padding
- hl-config-provider：增加tableIcon、buttonIcon配置
- hl-button：优化tooltip的体验、增加user-select:none

### 0.7.19

- hl-date：修复显示异常

### 0.7.18

- hl-search-page：增加bottomClass用于设置下半部分的class

### 0.7.17

- hl-search-page：增加tableStyle属性设置表格区域的style，增加tableClass属性设置表格区域的class
- hl-search-page：属性noSearch为true是默认表格区域的margin-top为0

### 0.7.16

- hl-icon：增加type属性
- hl-del-button：最外层变更为用span包裹，用inline-flex解决幽灵节点问题

### 0.7.15

- hl-date：修复无法清除问题

### 0.7.14

- hl-date：DateElRange增加startPlaceholder和endPlaceholder属性

### 0.7.12

- hl-date：type增加el-range，使用el-date的范围选择

### 0.7.11

- 修复hl-del-button disabled=true 样式缺失问题

### 0.7.10

- hl-search-page：增加no-search属性配置隐藏搜索区域

### 0.7.9

- hl-date：修复外部start和end属性变化不会引起组件内部el-date的value变化问题

### 0.7.8

- 增加描述列表组件：hl-descriptipons和hl-descriptions-item

### 0.7.7

- hl-date：修复width='auto'时实际宽度为220px问题

### 0.7.6

- hl-search-list：修复没有advanced插槽依然显示高级搜索问题

### 0.7.5

- hl-dialog：默认可拖动
- hl-search-area：增加高级搜索插槽

### 0.7.4

- hl-form-dialog：提交成功触发的refresh事件增加回调参数 - 表单数据

### 0.7.3

- theme-chalk变更为@hl/ui一部分，不再作为单独的包发布

### 0.7.2

- hl-scroll：由于功能设计不单一故删除该组件(break-change)
- hl-date：type=range并且date-type=date时增加开始时间和结束时间的范围限制(break-change)
- 增加utils/check.update模块和utils/message模块

### 0.7.1

- 修复hl-scroll在一些特殊情况下滚动异常问题
- 修复hl-chart组件ID错误

### 0.7.0

- 增加远程下拉组件hl-select-remote
- hl-button的button-type为text时，禁止换行
- hl-context-menu：页面出现滚动条时显示位置不在点击位置
- hl-dialog：修复margin-bottom导致外部滚动条
- hl-icon-selecet：修复第二次打开弹框选择卡顿问题
- hl-page：v-model:page变更为v-model(break-change)
- hl-del-button：修复幽灵空白节点
- hl-block-title：样式太丑，增加平面样式
- hl-block-title：color和fonts-size不生效
- HlUiResolver：引入路径从@hl/ui变更为@hl/ui/resolver(break-change)
- hl-edit-info：优化显示，去除无用样式
- hl-dropdown：解决选中样式无法生效问题

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
