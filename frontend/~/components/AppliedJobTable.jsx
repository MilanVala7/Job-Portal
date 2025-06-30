import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="rounded-xl bg-white shadow-lg p-2 sm:p-6 overflow-x-auto border border-gray-200"
    >
      <Table className="min-w-full">
        <TableCaption>
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-gray-600 !font-bold">Date</TableHead>
            <TableHead className="text-gray-600 !font-bold">Role</TableHead>
            <TableHead className="text-gray-600 !font-bold">Company</TableHead>
            <TableHead className="text-gray-600 !font-bold text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {
              (!allAppliedJobs || allAppliedJobs.length === 0) ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TableCell colSpan={4} className="text-center py-8 text-gray-400 text-base font-medium">
                    <span className="text-2xl">🦄</span><br />
                    No jobs applied yet.
                  </TableCell>
                </motion.tr>
              ) : (
                allAppliedJobs.map((appliedJob, idx) => (
                  <motion.tr
                    key={appliedJob._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.4, delay: idx * 0.05, type: "spring" }}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell className="py-3 text-gray-700">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell className="py-3 font-semibold text-indigo-600">{appliedJob.job?.title}</TableCell>
                    <TableCell className="py-3 font-semibold text-gray-600">{appliedJob.job?.company?.name}</TableCell>
                    <TableCell className="py-3 text-right">
                      <Badge
                        className={
                          appliedJob?.status === "rejected"
                            ? 'bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full'
                            : appliedJob?.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700 font-semibold px-3 py-1 rounded-full'
                              : '!bg-green-100 !text-green-700 font-semibold px-3 py-1 rounded-full'
                        }
                      >
                        {appliedJob?.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </motion.tr>
                ))
              )
            }
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  )
}

export default AppliedJobTable