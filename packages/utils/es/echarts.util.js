import * as echarts from 'echarts/core'

// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
  EffectScatterChart,
  LineChart,
  LinesChart,
  PictorialBarChart,
  PieChart,
  SunburstChart,
  TreeChart,
  TreemapChart,
} from 'echarts/charts'

// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  DataZoomComponent,
  DatasetComponent,
  GeoComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components'

// 注册必须的组件
echarts.use([
  CanvasRenderer,
  LabelLayout,
  UniversalTransition,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  GeoComponent,
  BarChart,
  PieChart,
  PictorialBarChart,
  LinesChart,
  EffectScatterChart,
  LineChart,
  DataZoomComponent,
  TreeChart,
  TreemapChart,
  SunburstChart,
])

export default {

  // 默认配置
  default_config: {
    // 是否开启跟随window的resize事件重新resize图表，默认开启
    resize: true,
    // 设置容器的overflow，默认hidden；如果容器已经设置了overflow,则该配置不会生效
    overflow: 'hidden',
  },

  // 合并用户配置和默认配置
  assignConfig(config) {
    for (const key in this.default_config) {
      if (config[key] === undefined) {
        config[key] = this.default_config[key]
      }
    }
  },

  /**
   * 初始化echarts
   * @param {string | HTMLElement} container 容器ID||容器dom
   * @param {object} options echarts配置
   * @param {object} params 其他配置(默认配置中的配置)
   */
  init(container, options, params = {}) {
    if (!container) {
      throw new Error('请设置容器')
    }

    let dom = null
    if (container instanceof HTMLElement) {
      dom = container
    } else {
      dom = document.getElementById(container)
    }

    if (!dom) {
      throw new Error('请设置合法的容器')
    }
    dom.removeAttribute('_echarts_instance_')
    const chart = echarts.init(dom)

    if (options) {
      chart.setOption(options)
    }

    this.assignConfig(params)

    // 设置resize事件
    if (params.resize) {
      useEventListener(window, 'resize', useDebounceFn(() => {
        chart.resize()
      }, 200))
    }

    // 设置容器overflow
    if (dom.style.overflowX === '') {
      dom.style.overflowX = params.overflow
    }
    if (dom.style.overflowY === '') {
      dom.style.overflowY = params.overflow
    }

    return chart
  },

  registerMap(name, source) {
    echarts.registerMap(name, source)
  },
}
