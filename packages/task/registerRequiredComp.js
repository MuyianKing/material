import Property from './src/components/form-property'
import Form from './src/components/form'
import NodeProperty from './src/components/flow-node-property'

// 使用改包必须注册的组件
const registerComp = {
  install(app) {
    app.use(Property)
      .use(NodeProperty)
      .use(Form)
  },
}

export const registerRequiredComp = registerComp

export default registerRequiredComp
