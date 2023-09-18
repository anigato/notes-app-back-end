const { 
  addNoteHandler, 
  getAllNotesHandler, 
  getNoteByIdHandler, 
  editNoteByIdHandler, 
  deleteNodeByIdHandler 
} = require("./handler");

const routes = [
  // method create notes
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  // method menampilkan notes
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  // method menampilkan 1 note
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  // method menampilkan 1 note
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  // method menghapus 1 note
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNodeByIdHandler,
  },
];

module.exports = routes;
