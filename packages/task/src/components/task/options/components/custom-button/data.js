export default [
  {
    id: 200,
    name: '转派派出所',
    url: '/tyyh/url/content',
    format: [
      {
        key: 'organization',
        name: '单位',
        required: 'true',
        type: 'radio',
        content: [
          '本地',
          '外地',
          '上海',
          '北京',
        ],
      },
      {
        key: 'person',
        name: '人员',
        required: 'true',
        type: 'checked',
        content: [
          '本地',
          '外地',
          '上海',
          '北京',
        ],
      },
      {
        key: 'p1',
        name: '人员2',
        required: 'true',
        type: 'select',
        content: [
          '本地',
          '外地',
          '上海',
          '北京',
        ],
      },
      {
        key: 'P2',
        name: '文本',
        required: 'true',
        type: 'text',
      },
      {
        key: 'P3',
        name: '附件',
        required: 'true',
        type: 'upload',
        min: 1,
        max: 2,
      },
    ],
  },
]
