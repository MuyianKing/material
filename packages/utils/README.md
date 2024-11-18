#### 0.7.1

- validator.js改为全量引入

#### 0.7.0

- 移除message模块，由项目(@hl/ui、@hl/h5)自己维护(`break-change`)
- 移除check.update模块，由@hl/ui维护(`break-change`)
- handleErrorr模块不在显示异常，转由回调方法处理(`break-change`)

```js
import handleError from '@hl/utils/error'
import { ElMessage } from 'element-plus'

const app = createApp(App)

// 全局异常捕获
handleError(app)

// 变更为=>
handleError((msg) => {
  ElMessage({
    type: 'error',
    dangerouslyUseHTMLString: true,
    duration: 5000,
    message: msg,
  })
})
```

#### 0.6.2

- 优化es/error
- 优化index.js中各模块的引入导出方式

#### 0.6.0

- index.js抛出所有的方法

#### 0.5.12

- 优化 dom下isOverflow方法
- echarts.utils去掉引入echarts组件相关代码，这部分由项目引入
