import React, { useEffect, useState } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { MdSavings } from 'react-icons/md';
import { FcDebt } from 'react-icons/fc';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios';

function DashMember() {
  const [savings, setSavings] = useState(0);
  const [loansCount, setLoansCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch savings data
        const savingsResponse = await axios.get("http://localhost:200/api/funds/getfundsforuser", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const totalSavings = savingsResponse.data.reduce((acc, item) => acc + item.amount, 0);
        setSavings(totalSavings);

        // Fetch loans data
        const loansResponse = await axios.get("http://localhost:200/api/loans/getmemberloans", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setLoansCount(loansResponse.data.length);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>MY ACCOUNT</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>SAVINGS</h3>
            <MdSavings className='card_icon' />
          </div>
          <h1>{savings}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>LOANS</h3>
            <FcDebt className='card_icon' />
          </div>
          <h1>{loansCount}</h1>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default DashMember;
