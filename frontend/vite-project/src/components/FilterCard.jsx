import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer', 'Graphic Designer', 'Fashion Designer'],
  },
  {
    filterType: 'Salary (LPA)',
    array: ['3-9', '10-20', '21-45', '50-80'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  // Reset the filter
  const resetFilters = () => {
    setSelectedValue('');
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h1 className="font-bold text-2xl text-gray-900 mb-6">Filter Jobs</h1>
      <hr className="border-t-2 border-gray-100 mb-6" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h1 className="font-semibold text-lg text-gray-800 mb-4">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-3 my-2">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="h-5 w-5 border-2 border-gray-300 text-blue-600 rounded-full cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>

      {/* Reset Button */}
      <div className="mt-6">
        <Button
          onClick={resetFilters}
          className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterCard;