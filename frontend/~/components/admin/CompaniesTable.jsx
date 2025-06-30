import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div className="overflow-x-auto rounded-xl bg-white/90 shadow-xl border-0 backdrop-blur-md">
            <Table className="min-w-full hidden md:table">
                <TableCaption className="text-gray-500">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="text-gray-600 font-semibold">Logo</TableHead>
                        <TableHead className="text-gray-600 font-semibold">Name</TableHead>
                        <TableHead className="text-gray-600 font-semibold">Date</TableHead>
                        <TableHead className="text-gray-600 font-semibold text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence>
                        {filterCompany?.map((company, idx) => (
                            <motion.tr
                                key={company._id}
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={{ duration: 0.4, delay: idx * 0.05, type: "spring" }}
                                className="hover:bg-gray-50 transition"
                            >
                                <TableCell>
                                    <Avatar className="shadow border border-gray-200 w-10 h-10">
                                        <AvatarImage src={company.logo} className="object-cover w-10 h-10" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-semibold text-indigo-700 whitespace-nowrap">{company.name}</TableCell>
                                <TableCell className="text-gray-600 whitespace-nowrap">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-indigo-600 cursor-pointer transition" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-indigo-50 cursor-pointer transition"
                                            >
                                                <Edit2 className='w-4 text-indigo-600' />
                                                <span className="font-medium text-indigo-700">Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </TableBody>
            </Table>
            
            <div className="md:hidden mt-4 space-y-4">
                {filterCompany?.map((company, idx) => (
                    <motion.div
                        key={company._id}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.4, delay: idx * 0.05, type: "spring" }}
                        className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar className="shadow border border-gray-200 w-10 h-10">
                                <AvatarImage src={company.logo} className="object-cover w-10 h-10" />
                            </Avatar>
                            <div>
                                <div className="font-semibold text-indigo-700">{company.name}</div>
                                <div className="text-gray-600 text-xs">{company.createdAt.split("T")[0]}</div>
                            </div>
                        </div>
                        <Popover>
                            <PopoverTrigger>
                                <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-indigo-600 cursor-pointer transition" />
                            </PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div
                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                    className="flex items-center gap-2 px-2 py-1 rounded hover:bg-indigo-50 cursor-pointer transition"
                                >
                                    <Edit2 className='w-4 text-indigo-600' />
                                    <span className="font-medium text-indigo-700">Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default CompaniesTable