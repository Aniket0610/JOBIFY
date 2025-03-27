import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableCaption className="mt-4 text-gray-600">A list of your applied jobs</TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-medium text-gray-700">Date</TableHead>
            <TableHead className="font-medium text-gray-700">Job Role</TableHead>
            <TableHead className="font-medium text-gray-700">Company</TableHead>
            <TableHead className="text-right font-medium text-gray-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-600">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-50 transition-all duration-200">
                <TableCell className="text-gray-700">{appliedJob?.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="text-gray-700">{appliedJob.job?.title}</TableCell>
                <TableCell className="text-gray-700">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === 'rejected'
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : appliedJob.status === 'pending'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    } font-medium`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;