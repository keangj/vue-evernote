import request from '@/helpers/request'
import {clearlyDate} from '@/helpers/util'

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:notebookId',
  DELETE: '/notebooks/:notebookId'
}

export default {
  getNotebooks() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        // 笔记本列表排序
        res.data = res.data.sort((notebook1, notebook2) => {
          return notebook1.createdAt < notebook2.createdAt
        })
        // 添加距离笔记本创建时间提示
        res.data.forEach(notebook => {
          notebook.clearlyCreatedAt = clearlyDate(notebook.createdAt)
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addNotebook({ title = '' } = { title: '' }) {
    return request(URL.ADD, 'POST', {title})
  },
  updateNotebook(notebookId, { title = '' } = { title: '' }) {
    return request(URL.UPDATE.replace(':notebookId', notebookId), 'PATCH', {title})
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':notebookId', notebookId), 'DELETE')
  }
}
