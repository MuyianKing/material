class u {
  constructor() {
    this.columns = [], this.data = [], this.storageKey = [];
  }
  // 设置数据
  setData(s) {
    this.data = s;
  }
  // 设置columns
  setColumns(s) {
    this.columns = s;
  }
  // 设置自定义表头的key
  setStorageKey(s) {
    this.storageKey = s;
  }
  // 插入列
  insertColumn(s) {
    const t = this.columns.findIndex((e) => e.uuid === s.uuid);
    t > -1 ? this.updateColumn(t, s) : this.columns.push(s);
  }
  // 更新列
  updateColumn(s, t) {
    this.columns[s] = t;
  }
  // 删除列
  deleteColumn(s) {
    const t = this.columns.findIndex((e) => e.uuid === s);
    t > -1 && this.columns.splice(t, 1);
  }
}
export {
  u as default
};
