import { useState } from "react";

const GenreButtons = () => {
  const [showAll, setShowAll] = useState(false);

  const genres = [
    "Horror",
    "Comedy",
    "Drama",
    "Action",
    "Sci-fi",
    "Thriller",
    "Romantic",
    "Mystery",
    "Family",
    "Crime",
  ];

  const handleGenreClick = (genre) => {
    console.log("Selected Genre:", genre);
    // Your logic here
  };

  return (
    <div className="flex justify-center items-center gap-x-4 gap-y-2 py-4 flex-wrap">
      {genres.slice(0, showAll ? genres.length : 4).map((genre) => (
        <button
          key={genre}
          onClick={() => handleGenreClick(genre)}
          className="px-4 py-2 rounded-lg border-2"
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => setShowAll(!showAll)}
        className="px-4 py-2 rounded-lg border-2 bg-gray-200"
      >
        {showAll ? "Show Less" : "More"}
      </button>
    </div>
  );
};

export default GenreButtons;
