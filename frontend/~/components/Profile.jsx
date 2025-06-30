import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

const isResume = true

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const { user } = useSelector(store => store.auth)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="min-h-screen bg-gradient-to-tr from-[#f9fafc] via-[#e0c3fc] to-[#8ec5fc] pb-10"
    >
      <Navbar />
      <motion.div
        className="max-w-3xl mx-auto mt-6 sm:mt-10 rounded-[2.5rem] shadow-2xl bg-white/90 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
      >
        <div className="relative flex flex-col items-center pt-8 sm:pt-10 pb-4 sm:pb-6 px-4 sm:px-12 bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb]">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 ring-8 ring-white shadow-xl mb-2">
            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
          </Avatar>
          <Button
            onClick={() => setOpen(true)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:scale-110 transition"
            size="icon"
            variant="ghost"
          >
            <Pen className="w-5 h-5" />
          </Button>
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#6A38C2] to-[#a162f7] text-transparent bg-clip-text mb-1 mt-2 text-center break-words">{user?.name}</h1>
          <p className="text-gray-700 text-sm sm:text-base mb-2 text-center">{user?.profile?.bio}</p>
        </div>
        <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 bg-white/90">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="flex items-center gap-3 bg-indigo-50 rounded-xl px-3 sm:px-4 py-3 shadow-sm">
              <Mail className="text-indigo-500" />
              <span className="text-gray-700 font-medium break-all text-xs sm:text-base">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 bg-purple-50 rounded-xl px-3 sm:px-4 py-3 shadow-sm">
              <Contact className="text-purple-500" />
              <span className="text-gray-700 font-medium text-xs sm:text-base">{user?.phoneNumber}</span>
            </div>
          </div>
          <div className="mb-8">
            <h1 className="font-bold text-base sm:text-lg mb-2">Skills</h1>
            <div className="flex items-center gap-2 flex-wrap">
              {
                user?.profile?.skills && user?.profile?.skills.length !== 0
                  ? user?.profile?.skills.map((item, index) => (
                    <Badge key={index} className="!bg-indigo-500 font-light px-3 rounded-full shadow sm:text-base">{item}</Badge>
                  ))
                  : <span className="text-gray-400">NA</span>
              }
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
            <h1 className="font-bold text-base sm:text-lg mb-2">Resume</h1>
            {
              isResume && user?.profile?.resume
                ? <a target="_blank" rel="noopener noreferrer" href={user?.profile?.resume} className="text-blue-800 underline hover:underline font-medium break-all text-xs sm:text-base">{user?.profile?.resumeOriginalName}</a>
                : <span className="text-gray-400">NA</span>
            }
          </div>
        </div>
      </motion.div>
      <motion.div
        className="max-w-3xl mx-auto bg-white/90 rounded-[2.5rem] shadow-xl mt-6 sm:mt-8 p-4 sm:p-6 md:p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
      >
        <h1 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-indigo-700 text-center">Applied Jobs</h1>
        <AppliedJobTable />
      </motion.div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </motion.div>
  )
}

export default Profile