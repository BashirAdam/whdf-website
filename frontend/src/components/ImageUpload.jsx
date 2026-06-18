import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { api } from '../api';
import { getMediaUrl } from '../utils/mediaUrl';

const ImageUpload = ({ value, onChange, label = 'Cover Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image (JPG, PNG, GIF, WEBP)');
      return;
    }

    setUploading(true);
    try {
      const result = await api.admin.uploadImage(file);
      onChange(result.url);
    } catch (error) {
      alert(error.response?.data?.detail || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onSelect = (e) => {
    handleFile(e.target.files[0]);
    e.target.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      {value ? (
        <div className="relative">
          <img
            src={getMediaUrl(value)}
            alt="Cover preview"
            className="w-full max-h-48 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            {uploading ? 'Uploading...' : 'Drag & drop image here, or click to select'}
          </p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WEBP — max 5MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={onSelect}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;