import React, { useRef, useState } from 'react';
import { breathingSongsData, forestSongsData,waterSongsData, meditationSongsData } from '../assets/assets';
import { assets } from '../assets/assets';
import AlbumItem from '../components/Music/AlbumItem';
import SongItem from '../components/Music/SongItem';
import { useNavigate } from 'react-router-dom';

function Display() {

  const navigate = useNavigate();
  const meditationRef = useRef(null);
  const breathingRef = useRef(null);
  const waterRef = useRef(null);
  const forestRef = useRef(null);
  const sleepRef = useRef(null);
  const [activeTab, setActiveTab] = useState('music'); // default active tab

  const scrollToBreathing = () => {
    setActiveTab('breathing');
    breathingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const scrollToMeditation = () => {
    setActiveTab('meditate');
    meditationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const scrollToWater = () => {
    setActiveTab('water');
    waterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const scrollToForest = () => {
    setActiveTab('forest');
    forestRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const scrollToSleep = () => {
    setActiveTab('sleep');
    sleepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  

  return (
    <>
      <div className='w-full m-2 px-6 py-3 rounded text-secondary overflow-auto lg:w-[99%] lg:my-1.5'>
        <div className='w-full flex justify-between items-center font-semibold'>
          <div className='flex items-center gap-2'>
            <img onClick={() => navigate(-1)} className='w-8 bg-primary-content p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} />
            <img onClick={() => navigate(1)} className='w-8 bg-primary-content p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} />
            <h1 className='font-bold text-3xl text-primary'>Soundscapes</h1>
          </div>
        </div>

        {/* Tabs with active styles */}
        <div className='flex items-center gap-2 mt-3'>
          <p
            className={`px-4 py-1 rounded-2xl cursor-pointer ${activeTab === 'music' ? 'bg-white text-black' : 'bg-black text-white'}`}
            onClick={() => setActiveTab('music')}
          >
            Music
          </p>
          <p
            className={`px-4 py-1 rounded-2xl cursor-pointer ${activeTab === 'breathing' ? 'bg-white text-black' : 'bg-black text-white'}`}
            onClick={scrollToBreathing}
          >
            Breathing
          </p>
          <p
            className={`px-4 py-1 rounded-2xl cursor-pointer ${activeTab === 'meditate' ? 'bg-white text-black' : 'bg-black text-white'}`}
            onClick={scrollToMeditation}
          >
            Meditate
          </p>

          <p
            className={`px-4 py-1 rounded-2xl cursor-pointer ${activeTab === 'water' ? 'bg-white text-black' : 'bg-black text-white'}`}
            onClick={scrollToWater}
          > 
            Water Sounds
          </p>

          <p
            className={`px-4 py-1 rounded-2xl cursor-pointer ${activeTab === 'forest' ? 'bg-white text-black' : 'bg-black text-white'}`}
            onClick={scrollToForest} 
          >
            Forest Sounds
          </p>

          <p
            className={`px-4 py-1 rounded-2xl cursor-pointer ${activeTab === 'sleep' ? 'bg-white text-black' : 'bg-black text-white'}`}
            onClick={scrollToSleep}
          >
            Sleep
          </p> 
        </div>
      </div>

      {/* Breathing section */}
      <div className='mb-4' ref={breathingRef}>
        <h1 className='ml-2 my-5 font-bold text-xl'>Choose your comfort <span className='text-2xl text-primary'>Breathing</span> zone</h1>
        <div className='flex overflow-auto scrollbar-hide'>
          {breathingSongsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
              category={'breathing'}
            />
          ))}
        </div>
      </div>

      {/* Meditation section */}
      <div className='mb-4' ref={meditationRef}>
        <h1 className='ml-2 my-5 font-bold text-xl'>Choose your comfort <span className='text-2xl text-primary'>Meditation</span> zone</h1>
        <div className='flex overflow-auto scrollbar-hide'>
          {meditationSongsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
              category={'meditation'}
            />
          ))}
        </div>
      </div>

      {/* Water section */}
      <div className='mb-4' ref={waterRef}>
        <h1 className='ml-2 my-5 font-bold text-xl'>Choose your comfort <span className='text-2xl text-primary'>Water</span> zone</h1>
        <div className='flex overflow-auto scrollbar-hide'>
          {waterSongsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
              category={'water'}
            />
          ))}
        </div>
      </div>

      {/* Forest section */}
      <div className='mb-4' ref={forestRef}>
        <h1 className='ml-2 my-5 font-bold text-xl'>Choose your comfort <span className='text-2xl text-primary'>Forest</span> zone</h1>
        <div className='flex overflow-auto scrollbar-hide'>
          {forestSongsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
              category={'forest'}
            />
          ))}
        </div>
      </div>

      {/* Sleep section */}
      <div className='mb-4' ref={sleepRef}>
        <h1 className='ml-2 my-5 font-bold text-xl'>Choose your comfort <span className='text-2xl text-primary'>Breathing</span> zone</h1>
        <div className='flex overflow-auto scrollbar-hide mb-10'>
          {breathingSongsData.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
              category={'sleep'}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Display;
