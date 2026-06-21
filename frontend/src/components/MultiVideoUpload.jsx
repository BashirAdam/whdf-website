import React, { useState } from 'react';
import { X } from 'lucide-react';
import VideoUpload from './VideoUpload';
import { getMediaUrl } from '../utils/mediaUrl';

const MultiVideoUpload = ({ values = [], onChange, label = 'Videos' }) => {
  const [uploadKey, setUploadKey] = useState(0);

  const addVideo = (url) => {
    if (!url) return;
    onChange([...values, url]);
    setUploadKey((k) => k + 1);
  };

  const removeVideo = (index) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {values.length > 0 && (
        <div className="space-y-3">
          {values.map((url, index) => (
            <div key={`${url}-${index}`} className="relative rounded-lg border bg-gray-50 p-2">
              <video
                src={getMediaUrl(url)}
                controls
                className="w-full max-h-40 object-contain bg-black rounded"
              />
              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <VideoUpload
        key={uploadKey}
        value=""
        onChange={addVideo}
        label={values.length === 0 ? 'Add video (drag or click)' : 'Add another video'}
      />
    </div>
  );
};

export default MultiVideoUpload;