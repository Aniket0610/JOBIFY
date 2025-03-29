import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);
    const [applications, setApplications] = useState(applicants?.applications || []);

    useEffect(() => {
        setApplications(applicants?.applications);
    }, [applicants]);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                setApplications((prevApplications) =>
                    prevApplications.map((app) =>
                        app._id === id ? { ...app, status } : app
                    )
                );
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <Table>
                <TableCaption className="text-gray-500 text-sm mt-4">
                    A list of recent applicants
                </TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="text-gray-700 font-medium">Full Name</TableHead>
                        <TableHead className="text-gray-700 font-medium">Email</TableHead>
                        <TableHead className="text-gray-700 font-medium">Contact</TableHead>
                        <TableHead className="text-gray-700 font-medium">Resume</TableHead>
                        <TableHead className="text-gray-700 font-medium">Date</TableHead>
                        <TableHead className="text-gray-700 font-medium">Action Taken</TableHead>
                        <TableHead className="text-right text-gray-700 font-medium">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications &&
                        applications.map((item) => (
                            <TableRow key={item._id} className="hover:bg-gray-50 transition-colors duration-200">
                                <TableCell className="text-gray-900">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-gray-900">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-gray-900">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-gray-900">
                                    {item.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">NA</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-gray-600">{item?.applicant?.createdAt?.split('T')[0]}</TableCell>
                                <TableCell className="text-gray-900">
                                    {item?.status ? item.status : 'Pending'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-gray-500 hover:text-gray-900 cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2 border border-gray-200 rounded-lg shadow-sm">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <span className="text-sm text-gray-700">{status}</span>
                                                </div>
                                            ))}
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

export default ApplicantsTable;