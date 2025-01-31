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
      <div className="w-full flex flex-col  justify-center min-h-[65vh]  md:min-h-[75vh] xl:min-h-[55vh] text-white px-4 sm:px-20 2xl:px-52 pb-40 sm:pb-20 overflow-hidden ">
        <h1 className=" text-2xl sm:text-4xl xl:text-5xl leading-tight font-bold text-center pb-3 sm:pb-6  ">
          Discover Your Next Favourite <br></br> Show or Movie
        </h1>
        <h1 className="text-sm text-gray-400 font-semibold text-center self-center w-[85vw] sm:w-[70vw] xl:w-[32vw] ">
          Let ChatGPT help you find the perfect genre , title , or
          recommendation - just type  what you're in the mood for !
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

        {promptData ? (
          <div>
            {" "}
            {tmdbResults == null ? (
              <Loading />
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
  );
};

export default GptPage;
