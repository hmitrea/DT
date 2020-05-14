import React from "react";

const Youtube = (props) => {
  console.log("This is props.youtube", props.video);
  const { id } = props.video[0];

  const { videoId } = id;
  return (
    <div id="youtube-container">
      { <iframe
        className="youtube-iframe"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameborder="0"
        allow="accelerometer; autoplay;  encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>}
    </div>
  );
};

export default Youtube;
