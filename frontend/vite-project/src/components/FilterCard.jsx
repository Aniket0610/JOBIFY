import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Graphic Designer", "Fashion Designer"]
    },
    {
        filterType: "Salary (LPA)",
        array: ["3-9", "10-20", "21-45", "50-80"]
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
        <div className='w-full bg-white p-6 rounded-lg shadow-md'>
            <h1 className='font-bold text-xl text-gray-800 mb-4'>Filter Jobs</h1>
            <hr className='border-t-2 border-gray-200 mb-4'/>

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index} className='mb-6'>
                        <h1 className='font-semibold text-lg text-gray-700 mb-3'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={itemId} className='flex items-center space-x-3 my-2'>
                                    <RadioGroupItem 
                                        value={item} 
                                        id={itemId} 
                                        className='h-5 w-5 border-2 border-gray-300 rounded-full cursor-pointer hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    />
                                    <Label 
                                        htmlFor={itemId} 
                                        className='text-gray-600 cursor-pointer hover:text-gray-800'>
                                        {item}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>

            {/* Reset Button placed after the filters */}
            <div className="mt-4">
                <Button 
                    onClick={resetFilters} 
                    className='bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
                    Reset Filters
                </Button>
            </div>
        </div>
    );
};

export default FilterCard;
