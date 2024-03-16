// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const demoNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#F9FFA4'
        },
        info: {
            txt: 'Be happy and grateful!'
        }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://media4.giphy.com/media/qvtLuBQ7WVD0ZurSUz/giphy.gif?cid=ecf05e47aafc678dc980417742da1ee5d970c0c9efbe3ca7&rid=giphy.gif&ct=g"',
        },
        style: {
            backgroundColor: '#F9FFA4'
        }
    },
    {
        id: 'n103',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: "https://www.coding-academy.org/images/ca-logo-dark@2x.png",
        },
        style: {
            backgroundColor: '#FFA1A1'
        }
    },
    {
        id: 'n104',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'One hour of reading',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    },
    {
        id: 'n105',
        type: 'NoteVideo',
        isPinned: false,
        info: {
            src: 'https://www.youtube.com/embed/tgbNymZ7vqY',
        }
    },
    {
        id: 'n106',
        type: 'NoteVideo',
        isPinned: false,
        info: {
            src: 'https://www.youtube.com/embed/1PnVor36_40?si=f4UexM8Ag42JHrIz',
        }
    },
    {
        id: 'n107',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    },
    {
        id: 'n108',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: "https://i.insider.com/649afcb5867d960019d93090?width=700",
        },
        style: {
            backgroundColor: '#FFA1A1'
        }
    },
    {
        id: 'n109',
        type: 'NoteTodos',
        isPinned: true,
        info: {
            txt: ' 08:30 הצגת פרויקט ספרינט 3',
        }
    },
]

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    _createNote,
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                console.log('hey from query filterbytxt::')
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.info.txt || note.info.title))
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        console.log('noteBeforeSave',note)
        note = _createNote(note.title, note.txt, note.url, note.src)
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return { id: '', title: '', txt: '', url: '', src: '' }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = demoNotes

        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(title, txt, url, src) {
    const note = {}
    note.id = utilService.makeId()
    note.createdAt = Date.now()
    note.type = 'NoteTxt'
    note.isPinned = false
    note.style = {
        backgroundColor: utilService.getPrettyRandomColor()
    }
    note.info = {
        title: title,
        txt: txt,
        url: url,
        src: src
    }
    return note
}

function getDefaultFilter() {
    return { txt: '' }
}



