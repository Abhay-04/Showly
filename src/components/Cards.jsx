import { Link } from "react-router-dom";

const Cards = ({ data , title }) => {
  console.log(data);
  console.log(title);
  return (
    <div className="overflow-hidden grid  gap-4 grid-cols-12 px-8 mt-8 ">
      {data.map((d) => (
        <div className="col-span-12 sm:col-span-6 md:col-span-4 2xl:col-span-2" key={d.id}>
          <Link to={`/${d.media_type ||  title}/${d.id}`} className="text-white  ">
            <img
              className="w-[260px] h-[280px] rounded-md"
              src={`https://image.tmdb.org/t/p/w500/${d.backdrop_path || d.profile_path || d.poster_path}`}
            />
            <h4>
              {d.original_title ||
                d.original_title ||
                d.name ||
                d.original_name}
            </h4>
            <h4>{d.release_date || d.first_air_date}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
