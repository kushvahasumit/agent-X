function TopicInput({ topic, setTopic }) {
  return (
    <>
      <label className="text-sm font-medium mb-1 text-gray-300">
        Enter Topic
      </label>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. Trends, News..."
        className="w-full p-2 rounded-lg mb-4 mt-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
    </>
  );
}

export default TopicInput;
