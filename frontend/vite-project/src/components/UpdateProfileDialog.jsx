import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.map((skill) => skill).join(', ') || '',
    file: user?.profile?.resume || '',
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (e.target.name === 'file') {
      setInput({ ...input, file });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);

    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {/* Fullname Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right text-sm text-gray-700">
                Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* Email Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-sm text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* Phone Number Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right text-sm text-gray-700">
                Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* Bio Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right text-sm text-gray-700">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* Skills Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right text-sm text-gray-700">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* File Input (Resume) */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right text-sm text-gray-700">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter className="flex space-x-4">
            {loading ? (
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all duration-300">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all duration-300"
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
