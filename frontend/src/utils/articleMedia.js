export const collectImages = (item) => {
    if (!item) return [];
    const fromArray = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
    const legacy = item.image ? [item.image] : [];
    return [...new Set([...legacy, ...fromArray])];
  };
  
  export const collectVideos = (item) => {
    if (!item) return [];
    const fromArray = Array.isArray(item.videos) ? item.videos.filter(Boolean) : [];
    const legacy = item.video ? [item.video] : [];
    return [...new Set([...legacy, ...fromArray])];
  };