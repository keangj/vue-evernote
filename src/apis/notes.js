import request from '@/helpers/request'
import {clearlyDate} from '@/helpers/util'

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
}

export default {
  getNotes({ notebookId }) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId)).then(res => {
        res.data = res.data.map(note => {
          note.clearlyCreatedAt = clearlyDate(note.createdAt)
          note.clearlyUpdatedAt = clearlyDate(note.updatedAt)
          return note
        }).sort((note1, note2) => {
          return note1.updatedAt < note2.updatedAt
        })
        // res.data = res.data.sort((note1, note2) => {
        //   return note1.createdAt < note2.createdAt
        // })
        // res.data.forEach(note => {
        //   note.clearlyCreatedAt = clearlyDate(note.createdAt)
        // })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addNote({ notebookId }, { title = '', content = '' } = { title : '', content : '' }) {
    return request(URL.ADD.replace(':notebookId', notebookId), 'POST', {title})
  },
  updateNote({ noteId }, { title, content }) {
    return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title})
  },
  deleteNote({ noteId }) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  }
}
