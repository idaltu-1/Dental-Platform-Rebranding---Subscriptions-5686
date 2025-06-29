import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import NoteEditor from './NoteEditor';
import NotesList from './NotesList';
import NotesFilters from './NotesFilters';
import { clinicalNotesService } from '../../services/ClinicalNotesService';
import toast from 'react-hot-toast';

const { FiPlus, FiDownload, FiFilter, FiGrid, FiList, FiFileText, FiEdit, FiCalendar } = FiIcons;

function ClinicalNotesScreen() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    dateRange: '',
    author: '',
    patient: '',
    tags: []
  });

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [notes, filters]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await clinicalNotesService.getNotes();
      setNotes(data);
    } catch (error) {
      toast.error('Failed to load clinical notes');
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...notes];

    if (filters.type) {
      filtered = filtered.filter(note => note.type === filters.type);
    }

    if (filters.status) {
      filtered = filtered.filter(note => note.status === filters.status);
    }

    if (filters.author) {
      filtered = filtered.filter(note => 
        note.author.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    if (filters.patient) {
      filtered = filtered.filter(note => 
        note.patientName.toLowerCase().includes(filters.patient.toLowerCase())
      );
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(note => 
        filters.tags.some(tag => note.tags.includes(tag))
      );
    }

    if (filters.dateRange) {
      const now = new Date();
      let cutoffDate;
      
      switch (filters.dateRange) {
        case 'today':
          cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          cutoffDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          cutoffDate = null;
      }

      if (cutoffDate) {
        filtered = filtered.filter(note => new Date(note.createdAt) >= cutoffDate);
      }
    }

    setFilteredNotes(filtered);
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await clinicalNotesService.updateNote(editingNote.id, noteData);
        toast.success('Note updated successfully');
      } else {
        await clinicalNotesService.createNote(noteData);
        toast.success('Note created successfully');
      }
      
      setShowEditor(false);
      setEditingNote(null);
      loadNotes();
    } catch (error) {
      toast.error('Failed to save note');
      console.error('Failed to save note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await clinicalNotesService.deleteNote(noteId);
      toast.success('Note deleted successfully');
      loadNotes();
    } catch (error) {
      toast.error('Failed to delete note');
      console.error('Failed to delete note:', error);
    }
  };

  const handleExportNotes = async () => {
    try {
      await clinicalNotesService.exportNotes(filteredNotes);
      toast.success('Notes exported successfully');
    } catch (error) {
      toast.error('Failed to export notes');
      console.error('Failed to export notes:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (showEditor) {
    return (
      <NoteEditor
        note={editingNote}
        onSave={handleSaveNote}
        onCancel={() => {
          setShowEditor(false);
          setEditingNote(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Clinical Notes</h1>
          <p className="text-gray-600">
            Manage patient clinical documentation and treatment notes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <SafeIcon icon={FiFilter} />
          </button>
          
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              <SafeIcon icon={FiList} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              <SafeIcon icon={FiGrid} />
            </button>
          </div>

          <button
            onClick={handleExportNotes}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={FiDownload} />
            <span>Export</span>
          </button>

          <button
            onClick={handleCreateNote}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
          >
            <SafeIcon icon={FiPlus} />
            <span>New Note</span>
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <NotesFilters
            filters={filters}
            onChange={handleFilterChange}
            notes={notes}
          />
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Notes</p>
              <p className="text-2xl font-bold text-gray-900">{notes.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <SafeIcon icon={FiFileText} className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Draft Notes</p>
              <p className="text-2xl font-bold text-orange-600">
                {notes.filter(n => n.status === 'draft').length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              <SafeIcon icon={FiEdit} className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Week</p>
              <p className="text-2xl font-bold text-green-600">
                {notes.filter(n => {
                  const noteDate = new Date(n.createdAt);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return noteDate >= weekAgo;
                }).length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <SafeIcon icon={FiCalendar} className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Filtered Results</p>
              <p className="text-2xl font-bold text-purple-600">{filteredNotes.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <SafeIcon icon={FiFilter} className="text-white text-xl" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notes List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <NotesList
          notes={filteredNotes}
          viewMode={viewMode}
          loading={loading}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      </motion.div>
    </div>
  );
}

export default ClinicalNotesScreen;