import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { motion } from 'framer-motion'

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create company. Please try again."
      );
    }
  }

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
      <div className='flex-1 flex items-center justify-center px-2 sm:px-4'>
        <motion.div
          className='w-full max-w-xl bg-white/90 shadow-xl rounded-2xl p-6 sm:p-10 border-0 backdrop-blur-md mt-10 mb-10'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div
            className='mb-8'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <h1 className='font-bold text-2xl sm:text-3xl text-[#6A38C2] mb-2'>Your Company Name</h1>
            <p className='text-gray-500 text-sm sm:text-base'>
              What would you like to give your company name? You can change this later.
            </p>
          </motion.div>

          <div className="mb-6">
            <Label className="text-gray-700 font-medium">Company Name</Label>
            <Input
              type="text"
              className="my-2 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
              placeholder="JobHunt, Microsoft etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-2 mt-8'>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="w-full sm:w-auto bg-gradient-to-r from-[#a162f7] to-[#6A38C2] hover:from-[#6A38C2] hover:to-[#a162f7] text-white font-semibold shadow transition"
            >
              Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CompanyCreate