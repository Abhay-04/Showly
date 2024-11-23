const Cards = ({ data }) => {
  console.log(data);
  return (
    <div className="overflow-hidden flex flex-wrap gap-10 justify-start px-10">
      {data.map((d) => (
        <div key={d.id}>
          <div className="text-white  ">
            <img
              className="w-[260px] h-[280px] rounded-md"
              src={`https://image.tmdb.org/t/p/w500/${d.backdrop_path || d.profile_path}`}
            />
            <h4>
              {d.original_title ||
                d.original_title ||
                d.name ||
                d.original_name}
            </h4>
            <h4>{d.release_date || d.first_air_date}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
