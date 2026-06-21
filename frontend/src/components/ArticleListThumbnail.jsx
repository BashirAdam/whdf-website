import React from 'react';
import { Play } from 'lucide-react';
import { getMediaUrl } from '../utils/mediaUrl';
import { collectImages, collectVideos } from '../utils/articleMedia';

const ArticleListThumbnail = ({ item, alt = '' }) => {
  const images = collectImages(item);
  const videos = collectVideos(item);
  const image = images[0];

  if (!image && videos.length === 0) return null;

  return (
    <div className="md:w-1/3 flex-shrink-0">
      <div className="h-48 md:min-h-[220px] md:h-full bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 flex items-center justify-center p-3">
        {image ? (
          <img
            src={getMediaUrl(image)}
            alt={alt}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <Play className="h-14 w-14 text-gray-700 opacity-80" />
        )}
      </div>
    </div>
  );
};

export default ArticleListThumbnail;