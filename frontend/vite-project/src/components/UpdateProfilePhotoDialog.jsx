import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfilePhotoDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setProfilePhoto(file);
  };

  const updateProfilePhotoHandler = async () => {
    if (!profilePhoto) {
      toast.error('Please select a profile photo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', profilePhoto);

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/photo/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success('Profile photo updated successfully');
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
          <DialogTitle className="text-xl font-bold text-gray-900">Update Profile Photo</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 py-4">
            {/* Profile Photo Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePhoto" className="text-right text-sm text-gray-700">
                Profile Photo
              </Label>
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
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
                type="button"
                onClick={updateProfilePhotoHandler}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-all duration-300"
              >
                Update Profile Photo
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePhotoDialog;
