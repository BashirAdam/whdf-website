import React from 'react';
import { getMediaUrl } from '../utils/mediaUrl';
import { collectImages, collectVideos } from '../utils/articleMedia';

const CARD = 'w-full rounded-lg border border-gray-200 bg-gray-50 mb-6 shadow-sm';
const INNER = 'flex items-center justify-center w-full h-72 md:h-80 p-4';

const ArticleMediaGallery = ({ item, title = '' }) => {
  const images = collectImages(item);
  const videos = collectVideos(item);

  if (images.length === 0 && videos.length === 0) return null;

  return (
    <div>
      {images.map((url, index) => (
        <div key={`img-${index}-${url}`} className={CARD}>
          <div className={INNER}>
            <img
              src={getMediaUrl(url)}
              alt={title ? `${title} — ${index + 1}` : `Image ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      ))}

      {videos.map((url, index) => (
        <div key={`vid-${index}-${url}`} className={CARD}>
          <div className={INNER}>
            <video
              src={getMediaUrl(url)}
              controls
              playsInline
              className="max-w-full max-h-full object-contain bg-black rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleMediaGallery;