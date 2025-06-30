import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update company. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

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
                <motion.form
                    onSubmit={submitHandler}
                    className="w-full max-w-xl bg-white/90 shadow-xl rounded-2xl p-4 sm:p-8 border-0 backdrop-blur-md mt-10 mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <motion.div
                        className='flex flex-col sm:flex-row items-center gap-4 p-2 sm:p-0 mb-6'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <Button
                            onClick={() => navigate("/admin/companies")}
                            variant="outline"
                            type="button"
                            className="flex items-center gap-2 text-gray-500 font-semibold w-full sm:w-auto"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl text-[#6A38C2] text-center w-full sm:w-auto'>Company Setup</h1>
                    </motion.div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <Label className="text-gray-700 font-medium">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="mt-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-medium">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-medium">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="mt-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 font-medium">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-1 rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <Label className="text-gray-700 font-medium">Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="mt-1 cursor-pointer rounded-lg border-2 border-[#e0c3fc] focus:border-[#a162f7] focus:ring-2 focus:ring-[#a162f7] transition"
                            />
                        </div>
                    </div>
                    {
                        loading
                            ? <Button className="w-full my-4 bg-gradient-to-r from-[#a162f7] to-[#6A38C2] text-white" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                            : <Button type="submit" className="w-full my-4 bg-gradient-to-r from-[#a162f7] to-[#6A38C2] hover:from-[#6A38C2] hover:to-[#a162f7] text-white font-semibold shadow transition">
                                Update
                            </Button>
                    }
                </motion.form>
            </div>
        </motion.div>
    )
}

export default CompanySetup