import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText])

  return (
    <div className="overflow-x-auto rounded-xl bg-white/90 shadow-xl border-0 backdrop-blur-md">
      <Table className="min-w-full hidden md:table">
        <TableCaption className="text-gray-500">A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-gray-600 font-semibold">Company Name</TableHead>
            <TableHead className="text-gray-600 font-semibold">Role</TableHead>
            <TableHead className="text-gray-600 font-semibold">Date</TableHead>
            <TableHead className="text-gray-600 font-semibold text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filterJobs?.map((job, idx) => (
              <motion.tr
                key={job._id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.4, delay: idx * 0.05, type: "spring" }}
                className="hover:bg-gray-50 transition"
              >
                <TableCell className="text-gray-700 whitespace-nowrap">{job?.company?.name}</TableCell>
                <TableCell className="font-semibold text-indigo-700 whitespace-nowrap">{job?.title}</TableCell>
                <TableCell className="text-gray-600 whitespace-nowrap">{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-indigo-600 cursor-pointer transition" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-indigo-50 cursor-pointer transition"
                      >
                        <Eye className='w-4 text-indigo-600' />
                        <span className="font-medium text-indigo-700">Applicants</span>
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
        <AnimatePresence>
          {filterJobs?.map((job, idx) => (
            <motion.div
              key={job._id}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.4, delay: idx * 0.05, type: "spring" }}
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-indigo-700">{job?.company?.name}</div>
                <div className="text-gray-700">{job?.title}</div>
                <div className="text-gray-500 text-xs">{job?.createdAt.split("T")[0]}</div>
              </div>
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-indigo-600 cursor-pointer transition" />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div
                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                    className="flex items-center gap-2 px-2 py-1 rounded hover:bg-indigo-50 cursor-pointer transition"
                  >
                    <Eye className='w-4 text-indigo-600' />
                    <span className="font-medium text-indigo-700">Applicants</span>
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AdminJobsTable