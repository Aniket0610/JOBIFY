import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/companies/create")} className="bg-purple-700 text-white hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200">New Company</Button>
                </div>
                </div>  
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies