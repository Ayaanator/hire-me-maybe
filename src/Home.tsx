import { useState } from 'react'
import arthur from '././assets/arthur.jpg'
import stories from './stories.json'
import posts from './posts.json'
import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import useInteract from './store.js'
import { useEffect } from "react";

function Home() {
  const interactState = useInteract((state) => state.interactState);
  const setInteractState = useInteract((state) => state.setInteractState);

  //const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(interactState) {
      console.log(interactState);
      //setShowModal(true);
    }
  }, [interactState])

  const formatTextWithHashtags = (text) => {
    return text.split(/(#[a-zA-Z0-9_]+)/g).map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <span
            key={index}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-4 bg-[#fff9ed] items-start">

      <div className="col-span-3 flex flex-col gap-3 sticky self-start top-6">
        <div className="border border-gray-300 p-4 rounded-md bg-[#ffffff]">
          <img
            src={arthur}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-200 mb-4"
          />
          <h2 className="font-semibold">Arthur Morgan</h2>
          <p className="text-sm text-gray-500">
            Professional Gunslinger <br/> Bounty Hunter <br/> Farm Hand <br/> 
            Van Der Linde Gang Executive
          </p>
        </div>
        <div className="border border-gray-300 p-3 rounded-md bg-[#ffffff]">
          <h3 className="font-semibold text-sm mb-2">
            Applications Status
          </h3>
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Accepted: 0</span>
            <span className="text-red-500">Rejected: 378456</span>
          </div>
        </div>
      </div>

      <div className="col-span-6 flex flex-col gap-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 p-3 rounded-md bg-white"
          >
            <div className="flex flex-row items-center gap-3 justify-between">
              <div className="flex flex-row gap-3 items-center">
                <img
                  src={post.pfp}
                  alt="profile"
                  className="w-14 h-14 rounded-full object-cover border border-gray-200"
                />
                <div className="leading-tight">
                  <h1 className="font-semibold">{post.name}</h1>
                  <h1 className="text-gray-600">{post.role}</h1>
                  <h1 className="text-gray-600">{post.daysAgo} days ago</h1>
                </div>
              </div>

              <div>
                <button className="flex items-center gap-1 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-md transition-all duration-400 cursor-pointer"
                onClick={() => {setInteractState("Follow")}}>
                  <span className="text-lg leading-none">+</span>
                  <span className="text-sm font-medium">Follow</span>
                </button>
              </div>
            </div>

            <br></br>

            <h1 className="text-sm whitespace-pre-line">{formatTextWithHashtags(post.text)}</h1>
            {post.media && (
              <div className="mt-3">
                {post.mediaType === "image" && (
                  <img
                    src={post.media}
                    alt="post media"
                    className="rounded-md w-full object-cover border border-gray-200"
                  />
                )}

                {post.mediaType === "video" && (
                  <video
                    src={post.media}
                    controls
                    className="rounded-md w-full border border-gray-200"
                  />
                )}

                <div className="mt-3 flex flex-row justify-between text-gray-500">
                  <h1>Liked by {post.likes} others</h1>
                  <h1>{post.comments} comments</h1>
                </div>

                <div className="flex justify-around mt-4 pt-3 border-t border-gray-200">
  
                  <button onClick={() => {setInteractState("Like")}}
                  className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-500 transition-all duration-200 hover:scale-120 cursor-pointer" >
                    <Heart size={20} />
                    <span className="text-xs">Like</span>
                  </button>

                  <button onClick={() => {setInteractState("Comment")}}
                  className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-500 transition-all duration-200 hover:scale-120 cursor-pointer">
                    <MessageCircle size={20} />
                    <span className="text-xs">Comment</span>
                  </button>

                  <button onClick={() => {setInteractState("Repost")}}
                  className="flex flex-col items-center gap-1 text-gray-600 hover:text-green-500 transition-all duration-200 hover:scale-120 cursor-pointer">
                    <Repeat2 size={20} />
                    <span className="text-xs">Repost</span>
                  </button>

                  <button onClick={() => {setInteractState("Send")}}
                  className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-500 transition-all duration-200 hover:scale-120 cursor-pointer">
                    <Send size={20} />
                    <span className="text-xs">Send</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

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

      {interactState && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Whoops! You've run out of {interactState} tokens!
            </h2>

            <div className="flex flex-row gap-3">
              <button
                onClick={() => setInteractState("")}
                className="bg-blue-500 text-white rounded-md
                text-sm p-2"
              >
                Buy 100 extra {interactState} tokens for $12.99
              </button>

              <button
                onClick={() => setInteractState("")}
                className="bg-[#ffd76b] text-black rounded-md
                text-sm p-2"
              >
                HireMeMaybe Premium
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
