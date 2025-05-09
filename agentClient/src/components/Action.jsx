import { Loader2 } from "lucide-react";

function ActionButtons({ topic, loading, onGenerate }) {
  return (
    <button
      onClick={onGenerate}
      disabled={loading || !topic}
      className="w-full bg-gray-900 hover:bg-gray-800 transition duration-200 text-white font-semibold py-2 rounded-xl mb-4 disabled:opacity-50 border border-gray-700 flex items-center justify-center gap-2  "
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin w-4 h-4" /> AI Is Working...
        </span>
      ) : (
        "Generate Post With AI"
      )}
    </button>
  );
}

export default ActionButtons;
