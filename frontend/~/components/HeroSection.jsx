import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const HeroSection = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="bg-gradient-to-br from-[#f8f4ff] via-white to-[#e0e7ff] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
                <motion.div
                    initial={{ y: -5 }}
                    animate={{ y: 5 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    className="relative mx-auto inline-block"
                >
                    <span className="relative z-10 px-6 py-2 text-sm font-medium text-white bg-[#6A38C2] rounded-full shadow-lg inline-flex items-center">
                        🚀 Launch Your Career Today
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight"
                >
                    Discover, Apply & <br className="hidden sm:block" />
                    <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-[#e7575a] to-[#6A38C2] text-transparent bg-clip-text">
                            Land Your Dream Job
                        </span>
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#ff4d4f] to-[#6A38C2] rounded-full"></span>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
                >
                    Explore top job listings, connect with hiring companies,
                    and take the next step in your career journey.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-6 w-full max-w-3xl mx-auto"
                >
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company"
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-5 pr-16 py-4 border-2 border-gray-100 rounded-2xl bg-white/70 backdrop-blur-sm
              text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#6A38C2]/20
              shadow-sm hover:shadow-md transition-all duration-300 focus:border-[#6A38C2]/30
              hover:border-[#6A38C2]/20"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-gradient-to-r from-[#6A38C2] to-[#8E4BFF]
              text-white shadow-md hover:shadow-lg transition-all duration-200
              hover:from-[#5a2db8] hover:to-[#7d3df5] active:scale-95"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection