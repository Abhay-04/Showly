import { useEffect, useRef } from "react";
import HeaderBrowse from "./HeaderBrowse";
import { useDispatch, useSelector } from "react-redux";

import openAI from "../utils/openai";
import {
  addGPTResultData,
  addPromptData,
  removeGPTResultData,
} from "../store/gptSlice";
import gptToTmdbDataAsync from "../store/actions/gptToTmdb";
import VerticalCards from "./VerticalCards";


const GptPage = () => {
  const prompt = useRef(null);
  const dispatch = useDispatch();
  const tmdbResults = useSelector((store) => store.gpt.tmdbResults);
  const gptResults = useSelector((store) => store.gpt.gptResults);
 

  const handleSubmit = async () => {
    const queryText = prompt.current.value.trim();
    if (!queryText) return; // Prevent empty search

    dispatch(removeGPTResultData()); // Clear previous results
    dispatch(addPromptData(queryText));

    const query = `Act as a movie or TV show Recommendation System and suggest some movies or TV shows for the query: ${queryText}. Only give me names of 10 movies or TV shows, comma-separated like the example result given ahead. Example Result: Breaking Bad, The Social Network, Better Call Saul, Karwaan, Don`;

    // Call OpenAI API and store results
    const gptResults = await openAI.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-4o-mini",
    });

    const movieList = gptResults.choices[0].message.content.split(",");
    dispatch(addGPTResultData(movieList));

    dispatch(gptToTmdbDataAsync());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
     
      handleSubmit();
    }
  };

  useEffect(() => {
    // Focus on the prompt input when the page loads
    prompt.current.focus();
  }, []);

  return (
    <div className="bg-black text-white min-h-[100vh]">
      <HeaderBrowse />
      <div className="w-full  text-white px-6 sm:px-20 2xl:px-52 pb-40 sm:pb-20 overflow-hidden">
        <div className="flex justify-center gap-4 mt-4">
          <input
            ref={prompt}
            type="text"
            placeholder="What do you want to watch?"
            className="bg-black w-[40vw] px-4 py-2 border border-red-100 rounded-lg"
            onKeyDown={handleKeyDown} // Listen for Enter key
          />
          <button
            onClick={handleSubmit}
            className="bg-[#E50000] px-6 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        <div className="my-20 flex flex-col gap-y-10">
        {tmdbResults  !== null ? tmdbResults.map((c , index) => <VerticalCards key={c.id} data={c} title={gptResults[index]}/>) : null}
        </div>
      </div>
    </div>
  );
};

export default GptPage;

