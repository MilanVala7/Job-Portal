import React, { useEffect, useState } from "react"
import Navbar from "../shared/Navbar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup } from "../ui/radio-group"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { USER_API_END_POINT } from "/src/utils/constant"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "/src/redux/authSlice"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const { user } = useSelector(store => store.auth);
  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false))
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="bg-gradient-to-br from-[#e0c3fc] via-[#8ec5fc] to-[#f9f9f9] min-h-screen flex flex-col"
      style={{
        minHeight: "100vh",
        backgroundAttachment: "fixed"
      }}
    >
      <Navbar />
      <div className="flex items-center justify-center flex-1 px-4 py-10">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white/90 shadow-2xl rounded-3xl p-8 border-0 backdrop-blur-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <motion.h1
            className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-[#6A38C2] to-[#a162f7] bg-clip-text mb-8 text-center tracking-tight drop-shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            Create an Account
          </motion.h1>

          <div className="space-y-6">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label className="text-gray-700 font-semibold">Full Name</Label>
              <Input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                placeholder="John Doe"
                className="rounded-xl border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Label className="text-gray-700 font-semibold">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="rounded-xl border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label className="text-gray-700 font-semibold">Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                placeholder="9876543210"
                className="rounded-xl border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Label className="text-gray-700 font-semibold">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="rounded-xl border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
              />
            </motion.div>
          </div>

          <motion.div
            className="space-y-4 my-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label className="text-gray-700 font-semibold block mb-2">Select Role</Label>
            <RadioGroup className="flex gap-3 items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#a162f7] bg-gray-100 border-[#e0c3fc] focus:ring-[#a162f7] focus:ring-2 cursor-pointer"
                />
                <Label htmlFor="r1" className="text-gray-700">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#a162f7] bg-gray-100 border-[#e0c3fc] focus:ring-[#a162f7] focus:ring-2 cursor-pointer"
                />
                <Label htmlFor="r2" className="text-gray-700">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
            <motion.div
              className="my-6 space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Label className="text-gray-700 font-semibold">Upload Profile Picture</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={handleFileChange}
                className="mt-2 cursor-pointer rounded-xl border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
              />
            </motion.div>
          </motion.div>

          {
            loading
              ? <Button className="w-full mt-1.5 bg-gradient-to-r from-[#a162f7] to-[#6A38C2] hover:from-[#6A38C2] hover:to-[#a162f7] transition text-white text-md shadow-lg"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
              : <Button type="submit" className="w-full mt-1.5 bg-gradient-to-r from-[#a162f7] to-[#6A38C2] hover:from-[#6A38C2] hover:to-[#a162f7] transition text-white text-md shadow-lg"> Signup </Button>
          }

          <motion.p
            className="text-sm text-gray-600 mt-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Already have an account?
            <Link to="/login" className="text-[#a162f7] hover:underline ml-1 font-semibold">
              Login
            </Link>
          </motion.p>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Signup;
