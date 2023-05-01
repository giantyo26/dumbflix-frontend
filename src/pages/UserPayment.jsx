 import { useNavigate } from "react-router-dom";
 import { API } from "../config/api";
 import { useState, useEffect } from "react";
 import { useMutation } from "react-query";
 
 export default function UserPayment() {
    const navigate = useNavigate();
    
    const handleOnClick = useMutation(async (data) => {
      try {
        const response = await API.post("/transactions", data);
        console.log("success : ", response.data.data.token);
        const token = response.data.data.token;
        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log(result);
            navigate("/");
          },
          onPending: function (result) {
            console.log(result);
            navigate("/");

          },
          onError: function (result) {
            console.log(result);
          },
          onClose: function () {
            alert("you closed the popup without finishing the payment");
          },
        });
      } catch (error) {
        console.log("transaction failed: ", error);
      }
    });
    
    useEffect(() => {
      const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
      const myMidtransClientKey = import.meta.env.VITE_REACT_APP_MIDTRANS_CLIENT_KEY;
      let scriptTag = document.createElement("script");
      scriptTag.src = midtransScriptUrl;
      scriptTag.setAttribute("data-client-key", myMidtransClientKey);
  
      document.body.appendChild(scriptTag);
      return () => {
        document.body.removeChild(scriptTag);
      };
    }, []);
      return (
        <div className="pt-7 w-full bg-black h-[700px]">
          <h2 className="text-center text-3xl font-bold text-white mt-20">
            Premium Subscription
          </h2>
          <div className="my-5">
            <p className="text-center">
              Bayar sekarang dan nikmati streaming film-film yang kekinian dari{" "}
              <span className="font-bold text-darkRed">DUMBFLIX</span>
            </p>
            <p className="text-center text-white font-bold mt-3 ">
              <span className=" font-bold text-darkRed">DUMBFLIX</span> : 0981312323
            </p>
          </div>
         

          <div className='text-black flex gap-6 justify-center '>
            <button type="submit" onClick={() => handleOnClick.mutate({price:30000,days:30})} className='w-[150px] h-[150px] bg-darkRed rounded-md text-white border-2 border-darkBlack flex flex-col items-center justify-center active:bg-darkBlack'>
              <div className='h-1/2'>
                <h1 className='text-center font-semibold text-5xl'>30K</h1>
                <h1 className='text-center text-1xl'>1 Month</h1>
              </div>
            </button>
            <button type="submit" onClick={() => handleOnClick.mutate({price:80000,days:90})} className='w-[150px] h-[150px] bg-darkRed rounded-md text-white border-2 border-darkBlack flex flex-col items-center justify-center active:bg-darkBlack'>
              <div className='h-1/2'>
                <h1 className='text-center font-semibold text-5xl'>80K</h1>
                <h1 className='text-center text-1xl'>3 Month</h1>
              </div>
            </button>
            <button type="submit" onClick={() => handleOnClick.mutate({price:150000,days:180})} className='w-[150px] h-[150px] bg-darkRed rounded-md text-white border-2 border-darkBlack flex flex-col items-center justify-center active:bg-darkBlack'>
              <div className='h-1/2'>
                <h1 className='text-center font-semibold text-5xl'>150K</h1>
                <h1 className='text-center text-1xl'>6 Month</h1>
              </div>
            </button>
          </div>
        </div>
      );
    }
    