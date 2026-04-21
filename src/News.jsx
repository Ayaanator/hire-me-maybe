import { X } from "lucide-react";
import { useCredit } from "./store.js";
import stories from './stories.json'

function News() {

  return (
    <div className="col-span-3 border border-gray-300 p-3 rounded-md bg-[#ffffff]">
      <h1 className="font-bold text-2xl">HireMeMaybe News</h1>
      <h1 className="font-semibold text-1xl mb-5">Top Stories</h1>

      {stories.map((story) => (
        <div key={story.id} className="w-full p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-all duration-400">
          <h3 className="hover:underline cursor-pointer">{story.title}</h3>
          <p className="text-gray-500">{story.hoursAgo} hours ago • {story.readers} readers</p>
        </div>
      ))}
    </div>
  );
}

export default News;