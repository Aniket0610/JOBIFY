import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="relative max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-xl mt-10">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 animate-gradient-x z-0 rounded-lg"></div>

        <div className="relative z-10">
          <div className="my-10">
            <h1 className="font-bold text-2xl text-gray-900">Your Company Name</h1>
            <p className="text-gray-600 mt-2">
              What would you like to name your company? You can change this later.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Company Name</Label>
            <Input
              type="text"
              placeholder="JobHunt, Microsoft, etc."
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-4 mt-10">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/companies')}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="bg-purple-700 text-white hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
            >
              Continue
            </Button>
          </div>

          {/* Illustration
          <div className="mt-10">
            <img
              src="https://illustrations.popsy.co/purple/business-plan.svg" // Replace with your illustration URL
              alt="Company Creation Illustration"
              className="w-64 h-64 mx-auto"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
