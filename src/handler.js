// import nanoid untuk id random
const {nanoid} = require('nanoid');
// import notes untuk menyimpan note
const notes = require('./notes');

// method tambah note
const addNoteHandler = (request, h) => {
   //  mendapatkan body request di Hapi
   const {title, tags, body} = request.payload;

   // id otomatis terisi dari nanoid
   const id = nanoid(16);
   // tanggal jadi string
   const createdAt = new Date().toISOString;
   const updateAt = createdAt;

   // array untuk menyimpan nilai notes
   const newNote = {
      title, tags, body, id, createdAt, updateAt,
   };

   // memasukan array newNote ke file notes
   notes.push(newNote);

   // menentukan apakan newNote sudah masuk pada array notes
   const isSuccess = notes.filter((note) => note.id === id).length > 0;

   // cek isSuccess apakah true
   if (isSuccess) {
      const response =h.response({
         status: 'success',
         message: 'Note berhasil ditambahkan',
         data: {
            noteId: id,
         },
      });
      response.code(201);
      return response;
   } else {
      const response = h.response({
         status: 'fail',
         message: 'Note gagal ditambahkan',
      });
      response.code(500);
      return response;
   }

};

// method lihat notes
const getAllNotesHandler = () => ({
   status: 'success',
   // data yg ditampilkan semua notes
   data: {
      notes,
   },
});

// method lihat 1 note
const getNoteByIdHandler = (request, h) => {
   // dapatkan id
   const {id} = request.params;

   //  dapatkan object note dari array pada file notes.js, ambil array pertama
   const note = notes.filter((n) => n.id === id)[0];

   // kondisi menentukan apakah note ditemukan atau tidak
   if (note !== undefined) {
      return {
         status: 'success',
         data: {
            note,
         },
      };
   } else {
      const response = h.response({
         status: 'fail',
         message: 'Note tidak ditemukan',
      });
      response.code(404);
      return response;
   }
};

// method ubah note
const editNoteByIdHandler = (request, h) => {
   // dapatkan id
   const {id} = request.params;

   // dapatkan data note nya
   const {title, tags, body} = request.payload;
   // atur pada updateAt agar sesuai dengan tanggal note diubah
   const updateAt = new Date().toISOString();
   // dapatkan index array pada objek note sesuai id
   const index = notes.findIndex((note) => note.id === id);
   // cek apakah index ditemukan atau tidak
   if (index !== -1) {
      notes[index] = {
         ...notes[index],
         title,
         tags,
         body,
         updateAt,
      };

      const response = h.response({
         status: 'success',
         message: 'Note berhasil diperbarui',
      });
      response.code(200);
      return response;
   } else {
      const response = h.response({
         status: 'fail',
         message: 'Catatan gagal diperbarui, ID tidak ditemukan',
      });
      response.code(404);
      return response;
   }
};

// method hapus note
const deleteNodeByIdHandler = (request, h) => {
   // dapatkan id
   const {id} = request.params;

   // dapatkan index dari objek note sesuai id
   const index = notes.findIndex((note) => note.id === id);
   // cek apakah index ditemukan, jika iya maka hapus
   if (index !== -1) {
      // hapus 1 data berdasarkan index
      notes.splice(index, 1);
      const response = h.response({
         status: 'success',
         message: 'Note berhasil dihapus',
      });
      response.code(200);
      return response;
   } else {
      const response = h.response({
         status: 'fail',
         message: 'Note gagal dihapus. ID tidak ditemukan',
      });
      response.code(404);
      return response;
   }
}

module.exports = {
   addNoteHandler, 
   getAllNotesHandler, 
   getNoteByIdHandler, 
   editNoteByIdHandler,
   deleteNodeByIdHandler
};