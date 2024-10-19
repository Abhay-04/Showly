const VideoTrailer = ({ trailerKey }) => {
  return (
    <div className="w-[100%] h-[45vh]">
      <iframe
        width="100%"
        height="100%"
        className="object-cover bg-center bg-gray-600 h-[100%]"
        src={`https://www.youtube.com/embed/${trailerKey}?si=701bB7fdbgG29UHX?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&mute=1`}
        title="YouTube video"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoTrailer;

// https://www.youtube.com/embed/ZdyaixHYviA?si=FnrTjF-iRfDhurJi?autoplay=1&mute=1
