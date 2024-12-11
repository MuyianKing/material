# hooks

### 0.7.10

- useList：HlListPage 增加noSearchArea用于配置hl-search-page的no-search属性

### 0.7.8

- useList：修复没有advanced插槽依然显示高级搜索问题

### 0.7.7

- useList：增加高级搜索

### 0.7.5

- useList：优化updateOne使用体验

### 0.7.4

- useList：修复updateOne数据解析错误问题

### 0.7.3

- useList：增加配置oneServer —— 更新一条数据方法，不配置默认取server，参数为id；返回updateOne方法用于手动更新一条数据

### 0.7.2

- useList：修复autoUpdate为false时手动触发分页不会查询问题
- useList：增加配置：不渲染分页

### 0.7.0

- 去除useSelect
- useRuquest变更为useListPage
- 增加useRequest、usePageRequest

### 0.6.2

- useList：优化autoUpdate监听方式

### 0.6.1

- useList：增加autoUpdate，参数变化自动请求接口
