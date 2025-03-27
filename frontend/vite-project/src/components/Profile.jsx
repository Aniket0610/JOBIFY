import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, FileText } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import UpdateProfilePhotoDialog from './UpdateProfilePhotoDialog'; // Import the new dialog
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false); // State for opening the profile photo dialog
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto my-8">
        {/* Profile Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <Avatar
                className="h-24 w-24 border-2 border-blue-500 cursor-pointer" // Add cursor-pointer to make it clickable
                onClick={() => setPhotoDialogOpen(true)} // Open the update photo dialog on click
              >
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.fullname}</h1>
                <p className="text-gray-600 mt-1">{user?.profile?.bio}</p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
            >
              <Pen className="h-5 w-5" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="h-5 w-5 text-blue-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Contact className="h-5 w-5 text-blue-500" />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length !== 0 ? (
                user?.profile?.skills?.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">NA</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Resume</h2>
            <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <FileText className="h-6 w-6 text-blue-500" />
              {user?.profile?.resume ? (
                <a
                  href={user?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span className="text-gray-500">No resume uploaded</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Table */}
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />

      {/* Update Profile Photo Dialog */}
      <UpdateProfilePhotoDialog open={photoDialogOpen} setOpen={setPhotoDialogOpen} /> {/* Pass state for photo dialog */}
    </div>
  );
};

export default Profile;
