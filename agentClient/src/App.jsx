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
    setLoading(true);
     
  };

  const handlePost =  () => {
    alert("posted");
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
