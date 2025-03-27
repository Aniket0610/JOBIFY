import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  // const deleteCompanyHandler = async (companyId) => {
  //   try {
  //     const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     });

  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //       setFilterCompany((prevCompanies) => prevCompanies.filter((company) => company._id !== companyId));
  //       navigate('/admin/companies');
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Something went wrong.');
  //   }
  // };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <Table>
        <TableCaption className="text-gray-500 text-sm mt-4">
          A list of registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-gray-700 font-medium">Logo</TableHead>
            <TableHead className="text-gray-700 font-medium">Name</TableHead>
            <TableHead className="text-gray-700 font-medium">Date</TableHead>
            <TableHead className="text-right text-gray-700 font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <TableCell>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={company.logo} alt={company.name} className="object-cover" />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-gray-900">{company.name}</TableCell>
              <TableCell className="text-gray-600">{company.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-gray-500 hover:text-gray-900 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 border border-gray-200 rounded-lg shadow-sm">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 text-gray-700" />
                      <span className="text-sm text-gray-700">Edit</span>
                    </div>
                    {/* <div
                      onClick={() => deleteCompanyHandler(company._id)}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </div> */}
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

export default CompaniesTable;