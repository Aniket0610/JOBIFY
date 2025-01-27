import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './shared/Navbar';
import Job from './Job';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const Browse = () => {
    useGetAllJobs();
    const allJobs = useSelector((store) => store.job.allJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs?.length || 0})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {allJobs && allJobs.length > 0 ? (
                        allJobs.map((job) => (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                key={job._id}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))
                    ) : (
                        <p className='col-span-3 text-center'>No jobs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Browse;
