import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'

const shortlistingStatus = ["Accepted", "Rejected"];

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to update status");
        }
    }

    // Responsive Table for md+ and Cards for sm
    return (
        <div className="overflow-x-auto rounded-xl bg-white/90 shadow-xl border-0 backdrop-blur-md">
            {/* Table for md and up */}
            <Table className="min-w-full hidden md:table">
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence>
                        {
                            applicants && applicants?.applications?.map((item, idx) => (
                                <motion.tr
                                    key={item._id}
                                    variants={rowVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.4, delay: idx * 0.05, type: "spring" }}
                                >
                                    <TableCell>{item?.applicant?.name}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>
                                        {
                                            item.applicant?.profile?.resume
                                                ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a>
                                                : <span>NA</span>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-indigo-600 transition" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {
                                                    shortlistingStatus.map((status, index) => (
                                                        <div
                                                            onClick={() => statusHandler(status, item?._id)}
                                                            key={index}
                                                            className='flex w-fit items-center my-2 cursor-pointer hover:bg-indigo-50 px-2 py-1 rounded transition'
                                                        >
                                                            <span>{status}</span>
                                                        </div>
                                                    ))
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </motion.tr>
                            ))
                        }
                    </AnimatePresence>
                </TableBody>
            </Table>
            {/* Responsive cards for small screens */}
            <div className="md:hidden mt-4 space-y-4">
                <AnimatePresence>
                    {
                        applicants && applicants?.applications?.map((item, idx) => (
                            <motion.div
                                key={item._id}
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={{ duration: 0.4, delay: idx * 0.05, type: "spring" }}
                                className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-indigo-700">{item?.applicant?.name}</span>
                                    <span className="text-gray-700">{item?.applicant?.email}</span>
                                    <span className="text-gray-700">{item?.applicant?.phoneNumber}</span>
                                    <span className="text-gray-500 text-xs">
                                        {item?.applicant.createdAt.split("T")[0]}
                                    </span>
                                    <span>
                                        {
                                            item.applicant?.profile?.resume
                                                ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a>
                                                : <span>NA</span>
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-end">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-indigo-600 cursor-pointer transition" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        key={index}
                                                        className='flex w-fit items-center my-2 cursor-pointer hover:bg-indigo-50 px-2 py-1 rounded transition'
                                                    >
                                                        <span>{status}</span>
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </motion.div>
                        ))
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ApplicantsTable