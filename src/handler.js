const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (requets, h) => {
    const {title, tags, body} = requets.payload;

    const id = nanoid(16)
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updateAt,
    }

    notes.push(newNote);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if(isSuccess) {
        const response = h.response({
            status: 'succes',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            }
        })
        response.code(201);
        return response;
    }
    const response = h.response({
        status : 'fail',
        message: 'Catatan gagal ditembahkan'
    })
    response.code(500);
    return response
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    }
})

const getNoteByIdHandler = (requests,h) => {
    const {id} = requests.params;
    const note = notes.filter((n) => n.id === id)[0];

    if(note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            }
        }
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    })
    response.code(404);
    return response;
}

const editNodeByIdhandler = (requests,h) => {
    const {id} = requests.params;
    const {title, tags, body} = requests.payload;

    const updateAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index], title, tags, body, updateAt,
        }
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasi di perbaharui',
        })
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbaharui catatan. Id tidak ditemukan',
    })
    response.code(200);
    return response;
}

const deleteNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Cattan berhasil dihapus',
        })
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan'
    })
    response.code(404);
    return response;

}

module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNodeByIdhandler, deleteNoteByIdHandler};