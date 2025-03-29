"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-datepicker/dist/react-datepicker.css';

const TableBookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: new Date(),
        time: new Date(),
        partySize: '1',
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        handleChange('date', date);
    };

    const handleTimeChange = (time) => {
        handleChange('time', time);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        // You can use axios or fetch to send data to your server

        alert('Table booked successfully!');
    };

    return (
        <div className='flex w-full  justify-center items-center'>
            <form onSubmit={handleSubmit} className='p-4 md:w-1/2'>
                <h2 className='text-center font-bold'>Book a table</h2>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    required
                />

                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    required
                />



                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                            'DateTimePicker',

                        ]}
                    >

                        <DemoItem label="Select Date and time">
                            <DateTimePicker
                                orientation="landscape"
                                label="Select date and time"
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                            />
                        </DemoItem>

                    </DemoContainer>
                </LocalizationProvider>


                <label htmlFor="partySize">Party Size:</label>
                <select
                    id="partySize"
                    name="partySize"
                    value={formData.partySize}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    required
                >
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    {/* Add more options as needed */}
                </select>

                <button type="submit">Book Table</button>
            </form>
        </div>
    );
};

export default TableBookingForm;
