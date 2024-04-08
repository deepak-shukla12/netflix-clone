import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import YouTube from "react-youtube"; 
const API_KEY = process.env.REACT_APP_API_KEY;

const List = ({ title, param }) => {
  const [list, setList] = useState([]);
  const [trailerUrl,setTrailerUrl]=useState("");
  useEffect(()=>{
    fetchData(param).then( res => setList(res.data.results))
  },[]);

  const opts={
    height: "390",
    width: "100%",
    playerVars:{
      autoplay: 1,
    },
  };

  const handleClick=async (movie) => {
    try{
      if(trailerUrl){
        setTrailerUrl("");
      }
      else{
        await fetch(`https://api.themoviedb.org/3/movie/${movie}/videos?api_key=${API_KEY}&language=en-US`)
        .then(res=> res.json())
        .then(json=>setTrailerUrl(json.results))
      }
    }
    catch(err){
      console.error(err);
    }
  };

  //console.log(list)
  return(
    <div className="list">
      <div className="row">
        <h2 className="text-white title">{ title }</h2>
        <div className="col">
          <div className="row__posters">
            {
              list.map(item => <img
                onClick={()=> handleClick(item.id)}
                className="row__poster row__posterLarge"
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title}
              />)
            }
          </div>
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl[0]?.key} opts={opts} />}
      </div>
    </div>
  )
}

export default List;