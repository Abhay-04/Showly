export const USER_AVATAR =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";

export const NO_IMAGE_URL =
  "https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY} `,
  },
};

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", language: "English" },
  { identifier: "hindi", language: "Hindi" },
  { identifier: "spanish", language: "Spanish" },
  { identifier: "telugu", language: "Telugu" },
];

export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

export const genres = [
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
