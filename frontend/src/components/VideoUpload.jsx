import React, { useState, useRef } from 'react';
import { Upload, X, Film } from 'lucide-react';
import { api } from '../api';
import { getMediaUrl } from '../utils/mediaUrl';

const VideoUpload = ({ value, onChange, label = 'Cover Video' }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('video/')) {
      alert('Please select a video (MP4, WEBM, MOV)');
      return;
    }

    setUploading(true);
    try {
      const result = await api.admin.uploadVideo(file);
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
          <video
            src={getMediaUrl(value)}
            controls
            className="w-full max-h-48 rounded-lg border bg-black"
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
          <Film className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            {uploading ? 'Uploading video...' : 'Drag & drop video here, or click to select'}
          </p>
          <p className="text-xs text-gray-400 mt-1">MP4, WEBM, MOV — max 50MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={onSelect}
        className="hidden"
      />
    </div>
  );
};

export default VideoUpload;