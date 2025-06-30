import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react'

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "UI/UX Designer"]
  },
  {
    fitlerType: "Salary",
    array: [
      { label: "1Lakh to 5Lakh", value: { min: 1, max: 5 } },
      { label: "5Lakh to 10Lakh", value: { min: 5, max: 10 } },
      { label: "10Lakh to 20Lakh", value: { min: 10, max: 20 } },
      { label: "20Lakh to 50Lakh", value: { min: 20, max: 50 } },
    ]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  }
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [dispatch, selectedValue]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl border bg-white/60 backdrop-blur-md shadow-lg hover:shadow-indigo-200 transition-all cursor-pointer flex flex-col justify-between h-full"
    >
      <div className="flex items-start gap-3 mb-4">
        <Filter className="text-indigo-600 w-5 h-5" />
        <h2 className="text-lg font-bold bg-gradient-to-r from-[#6A38C2] to-[#a162f7] text-transparent bg-clip-text">
          Filter Jobs
        </h2>
      </div>

      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {fitlerData.map((data, index) => (
          <div key={index}>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {data.fitlerType}
            </h3>

            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                const value = typeof item === 'string' ? item : JSON.stringify(item.value);
                const label = typeof item === 'string' ? item : item.label;

                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 transition-all duration-200 hover:text-indigo-700"
                  >
                    <RadioGroupItem
                      value={value}
                      id={itemId}
                      className="text-indigo-600 border-gray-300"
                    />
                    <Label htmlFor={itemId} className="text-sm text-gray-600 cursor-pointer">
                      {label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
}

export default FilterCard