import {useEffect, useState} from 'react';

export default function App() {

    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);

    const randomNumber = (value)=>{
        return Math.floor(Math.random()*quotes.length);
    }
    const handleClick = ()=>{
        setIndex(index=>{
           let newIndex = index+1;
            return randomNumber(newIndex);
        })
    }

    useEffect(()=>{
        async function fetchQuotes(){

                   try{
                    const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness&limit=10',{
                        method: 'GET',
                        headers: { 'X-Api-Key': 'ai61EDVw44WOSaoNCldYMj09vzvFGWY2kECEX6bF'},
                        contentType: 'application/json'})
                    const data = await response.json();
                    setQuotes(data);
                    setLoading(false);
                    console.log(data);
                   }catch(e){
                    setLoading(true);
                    console.log('an error occured while fetching:'+e)
                }
                }

                fetchQuotes();
    },[])

    if(loading){
        return (
            <div className='bg-black w-screen h-screen flex gap-3 flex-col justify-center items-center transition-height duration-100'>
                <h2 className='font-bold text-5xl text-slate-200'>loading...</h2>
                <p className='font-thin text-slate-100 font-serif'>all good things take time</p>
            </div>
        );
    }
  return (
    <div className='bg-[var(--darkBlue)] w-screen h-screen flex justify-center items-center'>
        {quotes && (<div className='bg-[var(--grayishBlue)] w-96 h-auto rounded-md text-slate-200 flex flex-col justify-center gap-3 text-center p-3'>
            <span className='font-medium text-black'>{quotes[index].author}</span>
            <p className='font-bold'>{`"${quotes[index].quote}"`}</p>
            <div className='overflow-hidden mt-4'><svg className='relative right-10' width="444" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path className='fill-black' d="M0 8h196v1H0zM248 8h196v1H248z"/><g transform="translate(212)" className='fill-black'><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg></div>
            <button className='bg-[var(--neonGreen)] relative -bottom-8 w-min mx-auto justify-self-center p-2 text-slate-200 rounded-full' onClick={handleClick}><div><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733"/></svg></div></button>
        </div>)}
    </div>
  )
}
