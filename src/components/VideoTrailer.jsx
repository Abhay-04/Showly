import ReactPlayer from "react-player";

const VideoTrailer = ({ trailerKey }) => {
  return (
    <div className="w-full h-full -z-10  absolute ">
      {/* <iframe
          className="w-full h-full object-cover absolute  "
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&mute=1`}
          title="YouTube video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe> */}
      <ReactPlayer
        url={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&mute=1`}
        playing={true} muted={true} width={"100%"} height={"100%"} loop={true}
      />
    </div>
  );
};

export default VideoTrailer;
