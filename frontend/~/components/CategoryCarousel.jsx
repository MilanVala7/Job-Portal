import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '/src/redux/jobSlice';
import { motion } from "framer-motion";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="py-16 bg-gray-50">
            <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent className="gap-4">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 px-2 flex justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="rounded-full px-6 py-3 text-sm font-semibold border-gray-300 hover:bg-[#6A38C2] hover:border-[#6A38C2] transition-all shadow-md"
                                >
                                    {cat}
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white shadow hover:bg-gray-100" />
                <CarouselNext className="bg-white shadow hover:bg-gray-100" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel