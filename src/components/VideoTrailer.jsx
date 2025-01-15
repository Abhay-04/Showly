import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const VideoTrailer = ({ trailerKey }) => {

  const videoMutedStatus = useSelector((state)=> state.browse.videoMuted)
  return (
    <div className="w-[100%] h-full ">
      <ReactPlayer
        url={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&mute=0`}
        playing={true}
        muted={videoMutedStatus}
        width={"100%"}
        height={"100%"}
        loop={true}
      />
    </div>
  );
};

export default VideoTrailer;
