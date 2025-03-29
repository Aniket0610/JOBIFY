import React, { useEffect, useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '@/redux/jobSlice';
import { Button } from './ui/button';

const filterData = [
  {
    filterType: 'Location',
    key: 'location',
    options: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    key: 'industry',
    options: ['Frontend Developer', 'Backend Developer', 'FullStack Developer', 'Graphic Designer', 'Fashion Designer'],
  },
  {
    filterType: 'Salary (LPA)',
    key: 'salary',
    options: ['3-9', '10-20', '21-45', '50-80'],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.job.filters); // Get filters from Redux

  const handleCheckboxChange = (category, value) => {
    const updatedFilters = {
      ...filters,
      [category]: filters[category].includes(value)
        ? filters[category].filter((item) => item !== value)
        : [...filters[category], value],
    };
    dispatch(setFilters(updatedFilters)); // Update Redux store
  };

  // Reset filters
  const resetAllFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h1 className="font-bold text-2xl text-gray-900 mb-6">Filter Jobs</h1>
      <hr className="border-t-2 border-gray-100 mb-6" />

      {filterData.map((filter) => (
        <div key={filter.key} className="mb-6">
          <h1 className="font-semibold text-lg text-gray-800 mb-4">{filter.filterType}</h1>
          {filter.options.map((option) => (
            <div key={option} className="flex items-center space-x-3 my-2">
              <Checkbox
                id={`${filter.key}-${option}`}
                checked={filters[filter.key].includes(option)}
                onCheckedChange={() => handleCheckboxChange(filter.key, option)}
              />
              <Label htmlFor={`${filter.key}-${option}`} className="text-gray-700 cursor-pointer hover:text-gray-900">
                {option}
              </Label>
            </div>
          ))}
        </div>
      ))}

      {/* Reset Button */}
      <div className="mt-6">
        <Button
          onClick={resetAllFilters}
          className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterCard;
