import { useState } from "react";
import Header from "./components/Header";
import TopicInput from "./components/Input";
import ActionButtons from "./components/Action";
import PostPreview from "./components/Preview";
 

function App() {
  const [topic,setTopic] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;

    setLoading(true);
    setGeneratedPost("");
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
      console.log("my data",data);
      console.log(data.post)
      console.log(data.image.imagePath)
      console.log(data.image.imageUrl);

      setGeneratedPost(data.post || "No post generated...");
      setImageUrl(data.image.imageUrl || "Sorry img is not avilable...");
    } catch (error) {
      console.error("Error generating post:", error);
      setGeneratedPost("Failed to generate post.");
    } finally {
      setLoading(false);
    }
  };


  const handlePost = async () => {
    if(!generatedPost) return;

    try {
      const postOnX = await fetch("http://localhost:4000/api/post-to-twitter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content :generatedPost, imageUrl }),

      });

      const response = postOnX.json();
      console.log(response.tweetUrl);


    } catch (error) {
      
    }
  }


  return (
    <div className="w-[360px] min-h-[480px] bg-gradient-to-br from-black to-gray-700 text-white p-4 rounded-2xl shadow-lg font-sans">
      <Header />
      <TopicInput topic={topic} setTopic={setTopic} />
      <ActionButtons
        topic={topic}
        loading={loading}
        onGenerate={handleGenerate}
      />

      <PostPreview
        generatedPost={generatedPost}
        imageUrl={imageUrl}
        onPost={handlePost}
      />

      <p className="text-xs mt-6 text-center text-gray-400">
        Built with 🧠 by Sum!t
      </p>
    </div>
  );
}

export default App;
