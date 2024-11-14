import ReactPlayer from "react-player";

const VideoTrailer = ({ trailerKey }) => {
  return (
    <div className="w-full h-full  ">
      <ReactPlayer
        url={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&mute=0`}
        playing={true}
        muted={true}
        width={"100%"}
        height={"100%"}
        loop={true}
      />
    </div>
  );
};

export default VideoTrailer;
