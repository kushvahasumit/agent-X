import {Pencil} from 'lucide-react'
import { Loader2 } from "lucide-react";

function PostPreview({ generatedPost,editablePost,setEditablePost, imageUrl, onPost, loading }) {
  if (!generatedPost) return null;

  return (
    <>
      <div className="bg-gray-700 p-3 rounded-lg mb-3 relative">
        <h2 className="text-sm font-semibold text-gray-300 mb-1">
          Generated Post
        </h2>
        <textarea
          value={editablePost}
          onChange={(e) => {
            setEditablePost(e.target.value);
          }}
          className="w-full bg-gray-800 text-white p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-600 scrollbar-hide"
          rows={4}
        />
        <Pencil className="absolute bottom-2 right-2 m-4 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      {/* {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          className="w-full h-full object-cover rounded-xl shadow-md mb-4"
        />
      )} */}

      <button
        onClick={() => onPost(editablePost)}
        className="w-full bg-gray-900 hover:bg-gray-800 transition duration-200 text-white font-semibold py-2 rounded-xl mb-4 disabled:opacity-50 border border-gray-700 flex items-center justify-center gap-2 "
        disabled={!editablePost.trim()}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" /> Posting...
          </span>
        ) : (
          "Post to X"
        )}
      </button>
    </>
  );
}

export default PostPreview;
