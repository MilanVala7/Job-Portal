import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu } from 'lucide-react';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import logo from '../../../src/assets/logo.png';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-indigo-100"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4 sm:px-6 lg:px-10">
        <Link to="/">
          <motion.img
            src={logo}
            alt="JobifyX Logo"
            className="h-10 object-contain cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        <div className="hidden md:flex items-center justify-center flex-grow">
          <ul className="flex font-medium items-center gap-6 text-gray-700 text-sm tracking-tight">
            {user?.role === 'recruiter' ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive('/admin/companies') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'
                      }`}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive('/admin/jobs') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'
                      }`}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive('/') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'
                      }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive('/jobs') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'
                      }`}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${isActive('/browse') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'
                      }`}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline" className="text-sm rounded-md px-4 py-1.5 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 transition-all">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Avatar className="cursor-pointer ring-2 ring-indigo-400">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                  </Avatar>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-72 mt-2 shadow-xl border border-gray-200 bg-white rounded-xl p-4">
                <div className="flex flex-col items-center mb-4 text-center">
                  <Avatar className="w-16 h-16 ring-2 ring-indigo-300 mb-2">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                  </Avatar>
                  <h4 className="font-semibold text-gray-800 text-base">{user?.name}</h4>
                  <p className="text-xs text-gray-500">{user?.profile?.bio}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  {user?.role === 'student' && (
                    <div className="flex items-center gap-2 hover:bg-indigo-50 hover:text-indigo-600 rounded-md px-2 py-1 cursor-pointer transition-all">
                      <User2 className="w-4 h-4" />
                      <Link to="/profile">
                        <Button variant="link" className="text-sm p-0 h-auto">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 rounded-md px-2 py-1 transition-all cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <Button onClick={logoutHandler} variant="link" className="text-sm p-0 h-auto">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="md:hidden">
          <Menu className="h-6 w-6 text-gray-600 cursor-pointer hover:text-indigo-600" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden px-4 py-4 border-t bg-white space-y-4 text-sm shadow-sm"
          >
            <ul className="space-y-2 font-medium text-gray-700">
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)} className={`block px-3 py-2 rounded-md transition-all ${isActive('/') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" onClick={() => setMenuOpen(false)} className={`block px-3 py-2 rounded-md transition-all ${isActive('/jobs') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" onClick={() => setMenuOpen(false)} className={`block px-3 py-2 rounded-md transition-all ${isActive('/browse') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>
                  Browse
                </Link>
              </li>
            </ul>
            {!user ? (
              <div className="flex gap-2">
                <Link to="/login" className="w-1/2">
                  <Button variant="outline" className="w-full text-sm">Login</Button>
                </Link>
                <Link to="/signup" className="w-1/2">
                  <Button className="w-full text-sm bg-indigo-600 hover:bg-indigo-700 text-white">Signup</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {user?.role === 'student' && (
                  <div className="flex items-center gap-2 hover:bg-indigo-50 hover:text-indigo-600 px-2 py-1 rounded-md cursor-pointer transition-all">
                    <User2 className="w-4 h-4" />
                    <Link to="/profile">
                      <Button variant="link" className="text-sm p-0 h-auto">View Profile</Button>
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 px-2 py-1 rounded-md cursor-pointer transition-all">
                  <LogOut className="w-4 h-4" />
                  <Button onClick={logoutHandler} variant="link" className="text-sm p-0 h-auto">Logout</Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
