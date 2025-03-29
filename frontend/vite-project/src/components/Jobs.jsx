import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, filters } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    let filtered = allJobs;

    // Apply Location Filter
    if (filters.location.length > 0) {
      filtered = filtered.filter((job) => filters.location.includes(job.location));
    }

    // Apply Industry Filter
    if (filters.industry.length > 0) {
      filtered = filtered.filter((job) => filters.industry.includes(job.title));
    }

    // Apply Salary Filter
    if (filters.salary.length > 0) {
      filtered = filtered.filter((job) => {
        return filters.salary.some((range) => {
          const [minSalary, maxSalary] = range.split('-').map(Number);
          return job.salary >= minSalary && job.salary <= maxSalary;
        });
      });
    }

    setFilteredJobs(filtered);
  }, [allJobs, filters]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filteredJobs.length <= 0 ? (
            <span className="font-bold text-xl">Jobs not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
