import { createContext, useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { songsData,breathingSongsData,forestSongsData,waterSongsData,meditationSongsData } from "../../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider=(props)=>{

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track,setTrack] = useState(breathingSongsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] =useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })

    const play = ()=>{
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () =>{
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id, category) => {
        let data;
      
        switch (category) {
          case "breathing":
            data = breathingSongsData;
            break;
          case "forest":
            data = forestSongsData;
            break;
        //   case "sleep":
        //     data = sleepSongsData;
        //     break;
          case "water":
            data = waterSongsData;
            break;
          case "meditation":
            data = meditationSongsData;
            break;
          default:
            data = breathingSongsData;
        }
      
        await setTrack(data[id]);
        await audioRef.current.play();
        setPlayStatus(true);
      };

    useEffect(() => {
        if (!audioRef.current) return;
    
        const updateTime = () => {
            seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100))+"%";
            setTime({
                currentTime: {
                    second: Math.floor(audioRef.current.currentTime % 60),
                    minute: Math.floor(audioRef.current.currentTime / 60),
                },
                totalTime: {
                    second: Math.floor(audioRef.current.duration % 60) || 0,
                    minute: Math.floor(audioRef.current.duration / 60) || 0,
                },
            });
        };
    
        audioRef.current.ontimeupdate = updateTime;
    
        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
            }
        };
    }, [playStatus]); // Runs whenever playStatus changes
    

    const contextValue ={
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play,pause,
        playWithId

    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;