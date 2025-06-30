import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BadgeDollarSign, MapPin, Briefcase } from 'lucide-react'
import { Badge } from './ui/badge'

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl border bg-white/60 backdrop-blur-md shadow-lg hover:shadow-indigo-200 transition-all cursor-pointer flex flex-col justify-between h-85"
    >
      <div className="flex items-start gap-4 mb-4">
        {job?.company?.logo && (
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-12 h-12 object-cover rounded-full border"
          />
        )}
        <div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-[#6A38C2] to-[#a162f7] text-transparent bg-clip-text">
            {job?.title}
          </h3>
          <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded-md inline-block mt-1">
            {job?.company?.name}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {job?.description}
      </p>

      <div className="flex flex-col gap-2 text-sm text-gray-700 mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-500" />
          <Badge variant="outline">{job?.jobType}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <BadgeDollarSign className="w-4 h-4 text-green-600" />
          <Badge variant="outline">{job?.salary} LPA</Badge>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <Badge variant="outline">India</Badge>
        </div>
      </div>

      <button
        className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        onClick={() => navigate(`/description/${job?._id}`)}
      >
        Details
      </button>
    </motion.div>
  )
}

export default Job