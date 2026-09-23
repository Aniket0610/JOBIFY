import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    key: "industry",
    options: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Graphic Designer",
      "Fashion Designer",
    ],
  },
  {
    filterType: "Salary (LPA)",
    key: "salary",
    options: ["3-9", "10-20", "21-45", "50-80"],
  },
];

const defaultFilters = {
  location: [],
  industry: [],
  salary: [],
};

const FilterCard = () => {
  const dispatch = useDispatch();

  const filters = useSelector(
    (state) => state.job?.filters || defaultFilters
  );

  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category];

    const updatedFilters = {
      ...filters,
      [category]: currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value],
    };

    dispatch(setFilters(updatedFilters));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="w-full bg-white rounded-lg border shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Filter Jobs</h1>

      <hr className="mb-5" />

      {filterData.map((filter) => (
        <div key={filter.key} className="mb-6">
          <h2 className="font-semibold text-lg mb-3">
            {filter.filterType}
          </h2>

          {filter.options.map((option) => (
            <div
              key={option}
              className="flex items-center gap-3 mb-2"
            >
              <Checkbox
                id={`${filter.key}-${option}`}
                checked={filters[filter.key].includes(option)}
                onCheckedChange={() =>
                  handleCheckboxChange(filter.key, option)
                }
              />

              <Label
                htmlFor={`${filter.key}-${option}`}
                className="cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      ))}

      <Button
        onClick={handleReset}
        className="w-full bg-gray-700 hover:bg-gray-800"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterCard;