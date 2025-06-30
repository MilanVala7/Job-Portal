import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { motion } from 'framer-motion'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [dispatch, input]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="bg-gradient-to-br from-[#f9fafc] via-[#e0c3fc] to-[#8ec5fc] min-h-screen flex flex-col"
            style={{
                minHeight: "100vh",
                backgroundAttachment: "fixed"
            }}
        >
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 w-full flex-1 px-2 sm:px-4'>
                <motion.div
                    className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-8'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <Input
                        className="w-full sm:w-72 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition bg-white/90 shadow"
                        placeholder="🔍 Filter by company name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="w-full sm:w-auto bg-gradient-to-r from-[#a162f7] to-[#6A38C2] hover:from-[#6A38C2] hover:to-[#a162f7] text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                    >
                        + New Company
                    </Button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
                    className="bg-white/90 rounded-2xl shadow-xl p-2 sm:p-6 border-0 backdrop-blur-md"
                >
                    <CompaniesTable />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Companies