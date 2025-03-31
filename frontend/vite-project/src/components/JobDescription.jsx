import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Job Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="bg-blue-100 text-blue-700 font-medium">{singleJob?.position} Positions</Badge>
              <Badge className="bg-red-100 text-red-700 font-medium">{singleJob?.jobType}</Badge>
              <Badge className="bg-purple-100 text-purple-700 font-medium">{singleJob?.salary} LPA</Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-all duration-200`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        {/* Job Description Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-b-gray-200 pb-4">
            Job Description
          </h2>
          <div className="mt-6 space-y-4 text-gray-700">
            <div>
              <span className="font-semibold">Role:</span>
              <span className="ml-2">{singleJob?.title}</span>
            </div>
            <div>
              <span className="font-semibold">Location:</span>
              <span className="ml-2">{singleJob?.location}</span>
            </div>
            <div>
              <span className="font-semibold">Description:</span>
              <span className="ml-2">{singleJob?.description}</span>
            </div>
            <div>
              <span className="font-semibold">Requirements:</span>
              <span className="ml-2">{singleJob?.requirements}</span>
            </div>
            <div>
              <span className="font-semibold">Experience:</span>
              <span className="ml-2">{singleJob?.experienceLevel} yrs</span>
            </div>
            <div>
              <span className="font-semibold">Salary:</span>
              <span className="ml-2">{singleJob?.salary} LPA</span>
            </div>
            <div>
              <span className="font-semibold">Total Applicants:</span>
              <span className="ml-2">{singleJob?.applications?.length}</span>
            </div>
            <div>
              <span className="font-semibold">Posted Date:</span>
              <span className="ml-2">{singleJob?.createdAt.split('T')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;