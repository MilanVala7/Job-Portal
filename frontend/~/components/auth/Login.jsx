import React, { useEffect, useState } from "react"
import Navbar from "../shared/Navbar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup } from "../ui/radio-group"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "/src/utils/constant.js"
import { toast } from "sonner"
import { setLoading, setUser } from "/src/redux/authSlice"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })
    const { loading } = useSelector(store => store.auth)
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Login failed. Please try again."
            )
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [navigate, user])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="bg-gradient-to-br from-[#f9fafc] via-[#e0c3fc] to-[#8ec5fc] min-h-screen flex flex-col"
            style={{
                minHeight: "100vh",
                backgroundAttachment: "fixed"
            }}
        >
            <Navbar />
            <div className="flex items-center justify-center flex-1 px-4 py-10">
                <motion.form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white/90 shadow-xl rounded-2xl p-8 border-0 backdrop-blur-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, type: "spring" }}
                >
                    <motion.h1
                        className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-[#6A38C2] to-[#a162f7] bg-clip-text mb-8 text-center tracking-tight drop-shadow"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, type: "spring" }}
                    >
                        Login
                    </motion.h1>

                    <div className="space-y-5">
                        <div>
                            <Label className="text-gray-700 font-medium">Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={handleChange}
                                placeholder="johndoe@example.com"
                                className="mt-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-medium">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="mt-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-medium block mb-2">Select Role</Label>
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
                                    <Label htmlFor="student" className="text-gray-700">Student</Label>
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
                                    <Label htmlFor="recruiter" className="text-gray-700">
                                        Recruiter
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-full mt-6 bg-gradient-to-r from-[#a162f7] to-[#6A38C2] hover:from-[#6A38C2] hover:to-[#a162f7] transition text-white text-md shadow-lg">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-[#a162f7] to-[#6A38C2] hover:from-[#6A38C2] hover:to-[#a162f7] transition text-white text-md shadow-lg">
                            Login
                        </Button>
                    )}

                    <motion.p
                        className="text-sm text-gray-600 mt-6 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Don't have an account?
                        <Link to="/signup" className="text-[#a162f7] hover:underline ml-1 font-semibold">
                            Sign Up
                        </Link>
                    </motion.p>
                </motion.form>
            </div>
        </motion.div>
    )
}

export default Login
