function PostPreview({ generatedPost, imageUrl, onPost }) {
  if (!generatedPost) return null;

  return (
    <>
      <div className="bg-gray-700 p-3 rounded-lg mb-3">
        <h2 className="text-sm font-semibold text-gray-300 mb-1">
          Generated Post
        </h2>
        <p className="text-base">{generatedPost}</p>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          className="w-full h-full object-cover rounded-xl shadow-md mb-4"
        />
      )}

      <button
        onClick={onPost}
        className="w-full bg-gray-900 hover:bg-gray-800 transition duration-200 text-white font-semibold py-2 rounded-xl mb-4 disabled:opacity-50 border border-gray-700 flex items-center justify-center gap-2 "
      >
        Post to X
      </button>
    </>
  );
}

export default PostPreview;
