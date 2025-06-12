import Note from '../models/Node.js';

// Tạo note mới
export const createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lấy danh sách notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy note theo id
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note không tồn tại' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật note theo id
export const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNote) return res.status(404).json({ error: 'Note không tồn tại' });
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa note theo id
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ error: 'Note không tồn tại' });
    res.json({ message: 'Xoá thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
