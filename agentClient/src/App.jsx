import { useEffect, useState } from "react";
import Header from "./components/Header";
import TopicInput from "./components/Input";
import ActionButtons from "./components/Action";
import PostPreview from "./components/Preview";

function App() {
  const [topic, setTopic] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [editablePost, setEditablePost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [xUrl, setXurl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [checkFilter, setCheckFilter] = useState({ text: true, image: true });

  useEffect(() => {
    setEditablePost(generatedPost || "");
  }, [generatedPost]);

  const handleGenerate = async () => {
    if (!topic) return;

    setIsGenerating(true);
    setGeneratedPost("");
    setEditablePost("");
    setImageUrl("");

    try {
      const response = await fetch("http://localhost:4000/generate-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      
      localStorage.setItem("my post", data.post);
      localStorage.setItem("my IMG", data.image.imageUrl);

      setGeneratedPost(data.post || "No post generated...");
      setEditablePost(data.post || "");
      setImageUrl(data.image.imageUrl || "Sorry img is not avilable...");
    } catch (error) {
      console.error("Error generating post:", error);
      setGeneratedPost("Failed to generate post.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePost = async () => {
    if (!generatedPost) return;
    setIsPosting(true);
    try {
      const postOnX = await fetch("http://localhost:4000/api/post-to-twitter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editablePost,
          imagePath: "public/images/gemini-generated-image.png",
          filter: checkFilter,
        }),
      });

      const response = await postOnX.json();
      console.log(response.tweetUrl);
      setXurl(response.tweetUrl);
    } catch (error) {
      console.log(error);
    }finally{
      setIsPosting(false);
    }
  };

  return (
    <div className="w-[360px] min-h-[480px] bg-gradient-to-br from-black to-gray-700 text-white p-4 rounded-2xl shadow-lg font-sans">
      <Header />
      <TopicInput topic={topic} setTopic={setTopic} />

      <div className="mb-4 flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="text"
            checked={checkFilter?.text}
            onChange={(e) =>
              setCheckFilter((prev) => ({
                ...prev,
                text: e.target.checked,
              }))
            }
            className="appearance-none w-4 h-4 rounded-full border-2 border-white checked:bg-white checked:border-white transition duration-150"
          />
          <span className="text-sm">Text Only</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="image"
            checked={checkFilter?.image}
            onChange={(e) =>
              setCheckFilter((prev) => ({
                ...prev,
                image: e.target.checked,
              }))
            }
            className="appearance-none w-4 h-4 rounded-full border-2 border-white checked:bg-white checked:border-white transition duration-150"
          />
          <span className="text-sm">Image Only</span>
        </label>
      </div>

      <ActionButtons
        topic={topic}
        loading={isGenerating}
        onGenerate={handleGenerate}
      />

      <PostPreview
        generatedPost={generatedPost}
        editablePost={editablePost}
        setEditablePost={setEditablePost}
        imageUrl={imageUrl}
        loading={isPosting}
        onPost={handlePost}
        checkFilter={checkFilter}
      />

      {xUrl && (
        <div className="mt-4 bg-gray-800 border border-gray-600 p-3 rounded-xl shadow-inner text-center transition-all duration-300">
          <p className="text-sm text-green-400 font-semibold mb-1">
            Posted successfully!
          </p>
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline break-all hover:text-blue-300 transition"
          >
            View on X (Twitter)
          </a>
        </div>
      )}

      <p className="text-xs mt-6 text-center text-gray-400">
        Built with 🧠 by Sum!t
      </p>
    </div>
  );
}

export default App;
