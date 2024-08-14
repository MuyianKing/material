import Date from './base/date/Index.vue'
import Input from './base/input/Index.vue'
import OuterComp from './base/outer-comp/Index.vue'
import PlainText from './base/plain-text/Index.vue'
import RichText from './base/rich-text/Index.vue'
import Select from './base/select/Index.vue'
import Textarea from './base/textarea/Index.vue'
import Upload from './base/upload/Index.vue'
import Divider from './layout/divider/Index.vue'
import Flex from './layout/flex/Index.vue'
import Cycle from './task/cycle/Index.vue'
import CycleDays from './task/cycle-days/Index.vue'
import Deadline from './task/deadline/Index.vue'
import Level from './task/level/Index.vue'
import Org from './task/org/Index.vue'
import PersonSelect from './task/person-select/Index.vue'
import Supplement from './task/supplement/Index.vue'
import TaskUser from './task/task-user/Index.vue'
import Title from './task/title/Index.vue'
import AlarmSelect from './service/alarm-select/Index.vue'

export default {
  // 自动导入该文件下的所有vue文件，以“Form文件夹名”作为组件名称注册全局组件
  install(app) {
    const globModules = {
      Date,
      Input,
      OuterComp,
      PlainText,
      RichText,
      Select,
      Textarea,
      Upload,
      Divider,
      Flex,
      Cycle,
      CycleDays,
      Deadline,
      Level,
      Org,
      PersonSelect,
      Supplement,
      TaskUser,
      Title,
      AlarmSelect,
    }
    for (const key in globModules) {
      app.component(`Form${key}`, globModules[key])
    }
  },
}
