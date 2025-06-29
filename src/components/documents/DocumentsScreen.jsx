import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUpload, FiFile, FiImage, FiDownload, FiEye, FiTrash2, FiFolder, FiSearch } = FiIcons;

function DocumentsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const documents = [
    {
      id: 'DOC-001',
      name: 'X-Ray_John_Smith_2024.pdf',
      type: 'x-ray',
      category: 'imaging',
      size: '2.4 MB',
      patientName: 'John Smith',
      uploadedBy: 'Dr. Sarah Wilson',
      uploadedDate: '2024-01-15',
      icon: FiFile
    },
    {
      id: 'DOC-002',
      name: 'Treatment_Plan_Emma_Davis.pdf',
      type: 'treatment-plan',
      category: 'treatment',
      size: '1.8 MB',
      patientName: 'Emma Davis',
      uploadedBy: 'Dr. Michael Chen',
      uploadedDate: '2024-01-18',
      icon: FiFile
    },
    {
      id: 'DOC-003',
      name: 'Consent_Form_Michael_Wilson.pdf',
      type: 'consent',
      category: 'forms',
      size: '856 KB',
      patientName: 'Michael Wilson',
      uploadedBy: 'Admin Staff',
      uploadedDate: '2024-01-20',
      icon: FiFile
    },
    {
      id: 'DOC-004',
      name: 'Pre_Op_Photo_Lisa_Anderson.jpg',
      type: 'photo',
      category: 'imaging',
      size: '3.2 MB',
      patientName: 'Lisa Anderson',
      uploadedBy: 'Dr. Robert Taylor',
      uploadedDate: '2024-01-22',
      icon: FiImage
    }
  ];

  const categories = [
    { value: 'all', label: 'All Documents', count: documents.length },
    { value: 'imaging', label: 'Imaging', count: documents.filter(d => d.category === 'imaging').length },
    { value: 'treatment', label: 'Treatment Plans', count: documents.filter(d => d.category === 'treatment').length },
    { value: 'forms', label: 'Forms', count: documents.filter(d => d.category === 'forms').length },
    { value: 'lab', label: 'Lab Reports', count: documents.filter(d => d.category === 'lab').length }
  ];

  const getFileTypeColor = (category) => {
    switch (category) {
      case 'imaging': return 'text-blue-600 bg-blue-100';
      case 'treatment': return 'text-green-600 bg-green-100';
      case 'forms': return 'text-yellow-600 bg-yellow-100';
      case 'lab': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Management</h1>
          <p className="text-gray-600">Upload, organize, and manage patient documents</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all">
          <SafeIcon icon={FiUpload} />
          <span>Upload Document</span>
        </button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {categories.slice(1, 5).map((category, index) => (
          <motion.div
            key={category.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{category.label}</p>
                <p className="text-2xl font-bold text-gray-900">{category.count}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <SafeIcon icon={FiFolder} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8"
      >
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <SafeIcon icon={FiUpload} className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag and drop files here</h3>
          <p className="text-gray-600 mb-4">or click to browse your computer</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Choose Files
          </button>
          <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setCategoryFilter(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  categoryFilter === category.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Documents Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredDocuments.map((document, index) => (
          <motion.div
            key={document.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getFileTypeColor(document.category)}`}>
                <SafeIcon icon={document.icon} className="text-xl" />
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                  <SafeIcon icon={FiEye} className="text-sm" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                  <SafeIcon icon={FiDownload} className="text-sm" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                  <SafeIcon icon={FiTrash2} className="text-sm" />
                </button>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 truncate" title={document.name}>
              {document.name}
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Patient:</span>
                <span className="font-medium">{document.patientName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Size:</span>
                <span>{document.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Uploaded by:</span>
                <span>{document.uploadedBy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Date:</span>
                <span>{new Date(document.uploadedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getFileTypeColor(document.category)}`}>
                {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredDocuments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12">
            <SafeIcon icon={FiFile} className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or upload your first document</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Upload Document
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default DocumentsScreen;