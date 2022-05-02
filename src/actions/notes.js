import Swal from 'sweetalert2'
import { db } from '../firebase/firebase-config'
import { types } from '../types/types'
import { loadNotes } from '../helpers/loadNotes'
import { fileUpload } from '../helpers/fileUpload'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    const newNote = {
      body: '',
      date: new Date().getTime(),
      title: '',
    }

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
    dispatch(activeNote(doc.id, newNote))
  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
})

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    try {
      const uid = getState().auth.uid

      if (!note.url) {
        delete note.url
      }

      const noteToFirestore = { ...note }
      delete noteToFirestore.id
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)

      dispatch(refreshNotes(note.id, noteToFirestore))
      Swal.fire('Saved!', note.title, 'success')
    } catch (err) {
      console.log(err)
      Swal.fire('Error', err.message, 'error')
    }
  }
}

export const refreshNotes = (id, note) => ({
  type: types.notesUpdated,
  payload: { id, note: { id, ...note } },
})

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      },
    })

    const fileUrl = await fileUpload(file)

    dispatch(startSaveNote({ ...activeNote, url: fileUrl }))

    Swal.close()
  }
}
