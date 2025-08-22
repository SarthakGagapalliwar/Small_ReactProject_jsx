import {useState } from "react";


function StringCompression(){

    const compresString=(str)=>{
        let compressed= ''
        let count=1;

        for(let i=1; i<=str.length; i++){
            if(str[i]===str[i-1]){
                count++;
            }else{
                compressed+=str[i-1] + count;
                count=1;
            }
        }
        return compressed;
    }

    const[desc, setDesc]=useState("");
    const[compressDec,SetCompresDesc]=useState('');

    const handleCompressString=(event)=>{
        const text=event.target.value;
        setDesc(text);
        const compressedRes=compresString(text);
        // console.log(compressedRes);
        SetCompresDesc(compressedRes);
    }


    return(
        <div className="flex flex-col items-center pt-[80px] min-h-screen bg-gray-50 px-6">
            <h1>String Compression</h1>
                <div className="mt-5">
                    <textarea name="" id=""
                    className="w-full h-64 p-3 border-1 rounded text-sm resize-none"
                    placeholder="Enter the string..."
                    value={desc}
                    onChange={handleCompressString}
                    ></textarea>
                </div>
                <div className="mt-2">
                    <p
                     className="p-3 bg-gray-100 rounded-md"
                    >{compressDec || 'Compression preview will appear here'}</p>
                </div>
        </div>
    );
}

export default StringCompression;