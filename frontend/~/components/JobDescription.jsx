import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isIntiallyApplied)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                setIsApplied(true)
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    return (
        <motion.div
            className='max-w-4xl w-full mx-auto my-4 sm:my-8 md:my-10 bg-white/80 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 backdrop-blur-md border border-gray-200'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
        >
            <motion.div
                className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6'
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
                <div className="w-full">
                    <motion.h1
                        className='font-extrabold text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#6A38C2] to-[#a162f7] text-transparent bg-clip-text mb-2 break-words'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        {singleJob?.title}
                    </motion.h1>
                    <motion.div
                        className='flex flex-wrap items-center gap-2 sm:gap-3 mt-2'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <Badge className='text-blue-700 font-bold bg-blue-100 text-xs sm:text-sm' variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className='text-[#F83002] font-bold bg-red-100 text-xs sm:text-sm' variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className='text-[#7209b7] font-bold bg-purple-100 text-xs sm:text-sm' variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </motion.div>
                </div>
                <motion.div
                    className="w-full md:w-auto mt-4 md:mt-0 flex-shrink-0"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                >
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`w-full md:w-auto rounded-lg px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-md transition-all duration-200 ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#7209b7] to-[#a162f7] hover:from-[#5f32ad] hover:to-[#6A38C2]'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </motion.div>
            </motion.div>
            <motion.h1
                className='border-b-2 border-b-gray-200 font-semibold text-lg sm:text-xl text-gray-800 py-3 sm:py-4 mb-3 sm:mb-4'
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
            >
                Job Description
            </motion.h1>
            <motion.div
                className='my-2 sm:my-4 flex justify-between gap-x-6 sm:gap-x-12 gap-y-2 sm:gap-y-3'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                <div>
                    <h1 className='font-bold my-1 text-gray-700 text-sm sm:text-base'>Role: <span className='pl-2 sm:pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>

                    <h1 className='font-bold my-1 text-gray-700 text-sm sm:text-base'>Description: <span className='pl-2 sm:pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>

                    <h1 className='font-bold my-1 text-gray-700 text-sm sm:text-base'>Location: <span className='pl-2 sm:pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>

                    <h1 className='font-bold my-1 text-gray-700 text-sm sm:text-base'>Salary: <span className='pl-2 sm:pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>

                    <h1 className='font-bold my-1 text-gray-700 text-sm sm:text-base'>Experience Level: <span className='pl-2 sm:pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel || singleJob?.experience || '-'}</span></h1>

                    <h1 className='font-bold my-1 text-gray-700 text-sm sm:text-base'>No. of Positions: <span className='pl-2 sm:pl-4 font-normal text-gray-800'>{singleJob?.position}</span></h1>

                    <h1 className='font-bold my-1 text-gray-700 text-sm sm:text-base'>Total Applicants: <span className='pl-2 sm:pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>

                    <h1 className='font-bold my-1 text-gray-700 text-sm sm:text-base'>Posted Date: <span className='pl-2 sm:pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>

            </motion.div>
        </motion.div>
    )
}

export default JobDescription