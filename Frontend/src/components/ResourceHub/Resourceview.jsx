import React from 'react';
import { X } from 'lucide-react';

const ResourceContent = ({ resource }) => {
  // Check if it's a video type OR an exercise with a videoUrl
  if (resource.type === 'video' || (resource.type === 'exercise' && resource.videoUrl)) {
    return (
      <div className="aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={resource.videoUrl}
          title={resource.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  } 
  // If it's an article type OR an exercise with content (but no videoUrl)
  else if (resource.type === 'article' || (resource.type === 'exercise' && resource.content)) {
    // This view will only be used if the article/exercise has a 'content' property
    return (
      <div className="p-6 md:p-8">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">{resource.title}</h2>
        {/* This securely renders the HTML from your 'content' string */}
        <div 
          className="prose lg:prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ __html: resource.content }} 
        />
      </div>
    );
  } 
  // If it's an audio type
  else if (resource.type === 'audio') {
    return (
      <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{resource.title}</h2>
          <p className="text-gray-600 mb-6">{resource.description}</p>
          <audio controls autoPlay className="w-full">
              <source src={resource.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
          </audio>
      </div>
    );
  }
  // Default case if none of the above match or content is missing
  return <p className="p-8">This resource content cannot be displayed or is external.</p>;
};


const ResourceViewer = ({ resource, onClose }) => {
  if (!resource) return null;

  // IMPORTANT: The ResourceViewer itself will NOT render if the resource is an article with an 'articleUrl'
  // because handleResourceClick in ResourceHub opens a new tab directly.
  // This check is mainly for resources with 'content' to display in the modal.
  if (resource.type === 'article' && resource.articleUrl) {
    return null; // Don't render modal for external articles, as they are handled by window.open
  }


  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose} 
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="font-semibold text-lg">{resource.title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <ResourceContent resource={resource} />
      </div>
    </div>
  );
};

export default ResourceViewer;