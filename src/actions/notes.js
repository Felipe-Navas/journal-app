import { db } from "../firebase/firebase-config";


export const startNewNote = () => {
  return async(dispatch, getState) => {
    const uid = getState().auth.uid;

    const newNote = {
      body: '',
      date: new Date().getTime(),
      title: '',
    }

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    console.log(doc)
  }
}