import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicatinSlice';
import { motion } from 'framer-motion'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [dispatch, params.id]);

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
            <div className='max-w-7xl mx-auto w-full flex-1 px-2 sm:px-4'>
                <motion.h1
                    className='font-bold text-xl sm:text-2xl my-5 text-[#6A38C2]'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    Applicants {applicants?.applications?.length ? `(${applicants.applications.length})` : ""}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
                    className="bg-white/90 rounded-2xl shadow-xl p-2 sm:p-6 border-0 backdrop-blur-md"
                >
                    <ApplicantsTable />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Applicants