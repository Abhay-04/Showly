import { useEffect, useRef, useState } from "react";
import HeaderBrowse from "./HeaderBrowse";
import { useDispatch, useSelector } from "react-redux";

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
import { genres } from "../utils/constants";

const GptPage = () => {
  const [showAll, setShowAll] = useState(false);
  const prompt = useRef(null);
  const dispatch = useDispatch();
  const tmdbResults = useSelector((store) => store.gpt.tmdbResults);
  const gptResults = useSelector((store) => store.gpt.gptResults);
  const promptData = useSelector((store) => store.gpt.prompt);
  const langKey = useSelector((store) => store.config.language);
  const handleSubmit = async () => {
    let queryText = prompt.current.value.trim();
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
  const handleGenreClick = (value) => {
    prompt.current.value = value;
    handleSubmit();
  };

  useEffect(() => {
    // Focus on the prompt input when the page loads
    prompt.current.focus();
  }, []);

  

  return (
    <div className="bg-black text-white min-h-[100vh]">
      <HeaderBrowse />
      <div className="w-full flex flex-col  justify-center items-center min-h-[65vh]  md:min-h-[75vh]  2xl:min-h-[80vh] text-white px-4 sm:px-20 2xl:px-52 pb-40 sm:pb-20 overflow-hidden ">
        <h1 className=" text-2xl sm:text-4xl xl:text-5xl leading-tight font-bold  pb-3 sm:pb-6 text-center self-center w-[85vw] sm:w-[45vw] md:w-[50vw] 2xl:w-[35vw] ">
          {lang[langKey].gptHeading}
        </h1>
        <h1 className="text-sm text-gray-400 font-semibold text-center self-center w-[85vw] md:w-[45vw] sm:w-[70vw] 2xl:w-[32vw] ">
          {lang[langKey].gptSubHeading}
        </h1>
        <div className="flex text-sm sm:text-base justify-center items-center gap-4 mt-8">
          <div className="relative flex items-center">
            <i className="ri-search-line absolute left-3 text-gray-400"></i>
            <input
              ref={prompt}
              type="text"
              placeholder={lang[langKey].gptSearchPlaceholder}
              className="bg-black w-[70vw]  sm:w-[60vw] xl:w-[50vw] px-8 sm:px-10 py-3 border border-red-100 rounded-lg text-white placeholder:sm:text-lg placeholder:text-[12px]"
              onKeyDown={handleKeyDown} // Listen for Enter key
            />
            <i
              onClick={handlePromptClear}
              className="ri-close-line absolute right-3 text-xl cursor-pointer text-gray-400"
            ></i>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-[#E50000] sm:px-6 px-4 py-3 rounded-lg w-max "
          >
            {lang[langKey].search}
          </button>
        </div>

        <div className="flex justify-center items-center  gap-2  sm:gap-x-4 sm:gap-y-2 pt-6 pb-6 sm:pb-12 flex-wrap sm:w-[80%] xl:w-[50%]">
          {genres.slice(0, showAll ? genres.length : 3).map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className=" text-gray-200 px-6 py-2  rounded-full border-gray-600 border-2"
            >
              {genre}
            </button>
          ))}
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2  text-gray-200 rounded-full border-gray-600 border-2 "
          >
            {showAll ? "Show Less" : "More"}
          </button>
        </div>
        <div className="w-full">
          {promptData ? (
            <div>
              {" "}
              {tmdbResults == null ? (
                <Loading text={"start"} />
              ) : (
                <div className="my-20 flex flex-col gap-y-10">
                  {tmdbResults.map(
                    (c, index) =>
                      c.length > 0 && (
                        <VerticalCards
                          key={c.id}
                          data={c}
                          title={gptResults[index]}
                        />
                      )
                  )}
                </div>
              )}{" "}
            </div>
          ) : (
            <h1 className="text-center mt-11"></h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default GptPage;
