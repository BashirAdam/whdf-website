import React, { useState } from 'react';
import { X } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { getMediaUrl } from '../utils/mediaUrl';

const MultiImageUpload = ({ values = [], onChange, label = 'Images' }) => {
  const [uploadKey, setUploadKey] = useState(0);

  const addImage = (url) => {
    if (!url) return;
    onChange([...values, url]);
    setUploadKey((k) => k + 1);
  };

  const removeImage = (index) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {values.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {values.map((url, index) => (
            <div key={`${url}-${index}`} className="relative rounded-lg border bg-gray-50 p-2">
              <img
                src={getMediaUrl(url)}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-contain"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <ImageUpload
        key={uploadKey}
        value=""
        onChange={addImage}
        label={values.length === 0 ? 'Add image (drag or click)' : 'Add another image'}
      />
    </div>
  );
};

export default MultiImageUpload;