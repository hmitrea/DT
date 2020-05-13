import React from "react";

//shouldve been in display folder, dont wanna move it at this point

const Spotify = (props) => {
  if (!props.songs.length) {
    return <div id="spotify">Sorry, looks like spotify is not available in this country</div>;
  }
  // const arrayOfSongs = [];
  // for (let i = 0; i < 10; i += 1) {
  //   arrayOfSongs.push(
  //     <div className="song" key={'song' + i}>
  //       {props.songs[i].name} by {props.songs[i].by}
  //       <br></br>
  //       <a target="blank" href={props.songs[i].url}>
  //         Listen
  //       </a>
  //     </div>
  //   );
  // }
  const id = props.songs;
  // console.log('This is the id in Spotify.js', props.songs);
  // console.log('this is the id of the spotify playlist: ', id);
  return (
    <div id="spotify">
      <iframe
        className="spotify-iframe"
        src={`https://open.spotify.com/embed/playlist/${id}`}
        width="350"
        height="500"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default Spotify;
