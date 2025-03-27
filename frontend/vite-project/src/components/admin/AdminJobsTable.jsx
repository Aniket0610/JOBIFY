import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const deleteHandler = async (jobId) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                setFilterJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <Table>
                <TableCaption className="text-gray-500 text-sm mt-4">
                    A list of your recent posted jobs
                </TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="text-gray-700 font-medium">Logo</TableHead>
                        <TableHead className="text-gray-700 font-medium">Company Name</TableHead>
                        <TableHead className="text-gray-700 font-medium">Role</TableHead>
                        <TableHead className="text-gray-700 font-medium">Date</TableHead>
                        <TableHead className="text-right text-gray-700 font-medium">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow
                            key={job._id}
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                            <TableCell>
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={job?.company.logo} alt={job?.company.name} className="object-cover" />
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium text-gray-900">{job?.company?.name}</TableCell>
                            <TableCell className="text-gray-900">{job?.title}</TableCell>
                            <TableCell className="text-gray-600">{job?.createdAt.split('T')[0]}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-gray-500 hover:text-gray-900 cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2 border border-gray-200 rounded-lg shadow-sm">
                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                        >
                                            <Edit2 className="w-4 h-4 text-gray-700" />
                                            <span className="text-sm text-gray-700">Edit</span>
                                        </div>
                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                        >
                                            <Eye className="w-4 h-4 text-gray-700" />
                                            <span className="text-sm text-gray-700">Applicants</span>
                                        </div>
                                        <div
                                            onClick={() => deleteHandler(job._id)}
                                            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer text-red-500"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span className="text-sm">Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;