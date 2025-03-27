import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="relative text-center mt-8 py-12 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 animate-gradient-x z-0"></div>

      <div className="relative z-10 flex flex-col gap-5">
        {/* Badge */}
        <span className="mx-auto px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-bold shadow-sm">
          FIND THE PERFECT JOB
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mt-2">
          Search, Apply & <br /> Get Your{' '}
          <span className="text-purple-700">Dream Opportunity</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Discover your next career move with ease. Whether you're a frontend wizard, a backend guru, or a creative genius, we've got the perfect job waiting for you.
        </p>

        {/* Search Bar */}
        <div className="flex w-full max-w-2xl shadow-sm border border-gray-200 pl-6 pr-2 rounded-full items-center gap-4 mx-auto bg-white hover:shadow-md transition-shadow duration-200">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full py-3 text-gray-700 placeholder-gray-400 text-sm md:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;