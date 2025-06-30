import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to post job");
        } finally {
            setLoading(false);
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
            <div className='flex items-center justify-center w-full flex-1 px-2 sm:px-4 py-8'>
                <motion.form
                    onSubmit={submitHandler}
                    className='w-full max-w-3xl bg-white/90 border-0 shadow-xl rounded-2xl p-4 sm:p-8 backdrop-blur-md'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-[#6A38C2] mb-6 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        Post a New Job
                    </motion.h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="my-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="my-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="my-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className="sm:col-span-2">
                                    <Label>Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition my-1">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading
                            ? <Button className="w-full my-4 bg-gradient-to-r from-[#a162f7] to-[#6A38C2] text-white" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                            : <Button type="submit" className="w-full my-4 bg-gradient-to-r from-[#a162f7] to-[#6A38C2] hover:from-[#6A38C2] hover:to-[#a162f7] text-white font-semibold shadow transition">
                                Post New Job
                            </Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a job</p>
                    }
                </motion.form>
            </div>
        </motion.div>
    )
}

export default PostJob