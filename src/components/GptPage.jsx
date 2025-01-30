import { useEffect, useRef } from "react";
import HeaderBrowse from "./HeaderBrowse";
import { useDispatch, useSelector } from "react-redux";
import img from "../assets/noSuggestion2.webp";

import openAI from "../utils/openai";
import {
  addGPTResultData,
  addPromptData,
  removeGPTResultData,
  removeTMDBResultData,
} from "../store/gptSlice";
import gptToTmdbDataAsync from "../store/actions/gptToTmdb";
import VerticalCards from "./VerticalCards";
import Loading from "./Loading";
import lang from "../utils/languageConstants";

const GptPage = () => {
  const prompt = useRef(null);
  const dispatch = useDispatch();
  const tmdbResults = useSelector((store) => store.gpt.tmdbResults);
  const gptResults = useSelector((store) => store.gpt.gptResults);
  const promptData = useSelector((store) => store.gpt.prompt);
  const langKey = useSelector((store) => store.config.language);
  const handleSubmit = async () => {
    const queryText = prompt.current.value.trim();
    if (!queryText) return; // Prevent empty search

    dispatch(removeGPTResultData() && removeTMDBResultData()); // Clear previous results
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

  const handlePromptClear = () => {
    prompt.current.value = "";
  };

  useEffect(() => {
    // Focus on the prompt input when the page loads
    prompt.current.focus();
  }, []);

  return (
    <div className="bg-black text-white min-h-[100vh]">
      <HeaderBrowse />
      <div className="w-full  text-white px-4 sm:px-20 2xl:px-52 pb-40 sm:pb-20 overflow-hidden">
        <div className="flex  text-sm sm:text-base sm:justify-center gap-4 mt-4">
          <div className="relative flex items-center">
            <i className="ri-search-line absolute left-3 text-gray-400"></i>
            <input
              ref={prompt}
              type="text"
              placeholder={lang[langKey].gptSearchPlaceholder}
              className="bg-black w-[70vw]  sm:w-[70vw] px-8 sm:px-10 py-2 border border-red-100 rounded-lg text-white placeholder:sm:text-lg placeholder:text-[10px]"
              onKeyDown={handleKeyDown} // Listen for Enter key
            />
            <i
              onClick={handlePromptClear}
              className="ri-close-line absolute right-3 text-xl cursor-pointer text-gray-400"
            ></i>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-[#E50000] sm:px-6 px-4 py-2 rounded-lg w-max"
          >
            {lang[langKey].search}
          </button>
        </div>

        {promptData ? (
          <div>
            {" "}
            {tmdbResults == null ? (
              <Loading />
            ) : (
              <div className="my-20 flex flex-col gap-y-10">
                {tmdbResults.map((c, index) => (
                  <VerticalCards
                    key={c.id}
                    data={c}
                    title={gptResults[index]}
                  />
                ))}
              </div>
            )}{" "}
          </div>
        ) : <h1 className="text-center mt-11"></h1>}
      </div>
    </div>
  );
};

export default GptPage;
