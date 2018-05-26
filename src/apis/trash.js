import request from '@/helpers/request'
import {clearlyDate} from '@/helpers/util'

const URL = {
  CONFIRM: '/notes/:noteId/confirm',
  REVERT: '/notes/:noteId/revert',
  GET: '/notes/trash'
}

export default {
  confirm({ noteId }) {
    return request(URL.CONFIRM.replace(':noteId', noteId), 'DELETE')
  },
  revert({ noteId }) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
  },
  getTrash() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data = res.data.map(note => {
          note.clearlyCreatedAt = clearlyDate(note.createdAt)
          note.clearlyUpdatedAt = clearlyDate(note.updatedAt)
          return note
        }).sort((note1, note2) => {
          return note1.updatedAt < note2.updatedAt
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
