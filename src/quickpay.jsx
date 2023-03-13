import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Quickpay() {
    const[val1,setval1]=useState(0);
    const[val2,setval2]=useState(0);
    const[val3,setval3]=useState(0);
    const[val4,setval4]=useState(0);
    const[val5,setval5]=useState(0);

// create a new Date object
const date = new Date("03/03/2023");

// format the date string in mm-dd-yyyy format
    const formattedDate = date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
    const mydate2 = formattedDate.charAt(3)=='0' ? formattedDate.slice(0,3)+formattedDate.slice(4) : formattedDate;
    const mydate = mydate2.charAt(0)=='0' ? mydate2.slice(1) : mydate2;
    console.log(mydate);
    useEffect(() => {
        const intervalId = setInterval(async() => {
        await axios.post("https://impossible-gold-shoulder-pads.cyclic.app/getpaidlist",{date:mydate2})
         .then(res=>{
          setval1(res.data.totalAmount)})
        await axios.post("https://impossible-gold-shoulder-pads.cyclic.app/getexpenditureamd",{date:mydate2})
          .then(res=>{
           setval4(res.data.totalAmount)})
        await axios.post("https://impossible-gold-shoulder-pads.cyclic.app/todaysale",{date:mydate2})
         .then(res=>setval2(res.data.ts))
        await axios.get("https://impossible-gold-shoulder-pads.cyclic.app/wallet",{})
         .then(res=>setval5(res.data.wallet))
        await  axios.post("https://impossible-gold-shoulder-pads.cyclic.app/todayuser",{date:mydate2})
         .then(res=>setval3(res.data.todayuser))
        }, 10000);
        return () => clearInterval(intervalId);
      }, []);
      const arr = ["collections","expenditure","sales","wallet","users"]
  return (
    <>
      <h1>{arr[0]}</h1>
      <h2>{val1}</h2>
      <h1>{arr[1]}</h1>
      <h2>{val4}</h2>
      <h1>{arr[2]}</h1>
      <h2>{val2}</h2>
      <h1>{arr[3]}</h1>
      <h2>{val5}</h2>
      <h1>{arr[4]}</h1>
      <h2>{val3}</h2>
    </>
      )
}

export default Quickpay
