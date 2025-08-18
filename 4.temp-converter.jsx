import { useState } from "react";

 function Tempconverter() {
    const[celsius,setCelsius]=useState('')
    const[fahrenhit,setfahrenhit]=useState('')

    const celsiusToFarhrrenhite=(value)=>{
        return (value*9)/5+32;
    }
    const FahrenheitToCelsius=(value)=>{
        return ((value-32)*5)/9
    }

    const formateValue=(value)=>{
        if(value === '') return '';
        const numval=parseFloat(value);
        if(isNaN(numval)) return value;

        if(Number.isInteger(numval)){
            return numval.toString()
        }

        return numval.toFixed(2);
    }


    const handleCelsiusToFahrenheit=(value)=>{
        setCelsius(value)

        if(value=== ''){
            setfahrenhit('')
        }else{
            const numvalue=parseFloat(value)
            if(!isNaN(numvalue)){
                const res=celsiusToFarhrrenhite(numvalue)
                setfahrenhit(res.toFixed(2));
            }
        }
    }
    const handleFahrenheitToCelsius=(value)=>{
        setfahrenhit(value);
        
        if(value=== ''){
            setCelsius('')
        }else{
            const numvalue=parseFloat(value)
            if(!isNaN(numvalue)){
                const res=FahrenheitToCelsius(numvalue)
                setCelsius(res.toFixed(2));
            }
        }

    }
  return (
    <div className="flex flex-col items-center pt-[155px] min-h-screen bg-gray-50">
        <h1>Temperture Converter</h1>
        <div className="flex flex-column justify-center items-center gap-5">
            <label htmlFor="">Celsius</label>
            <input type="number"
            id="celsius"
            value={formateValue(celsius)}
            onChange={(event)=>handleCelsiusToFahrenheit(event.target.value)}
            placeholder="0"
            />
            <label htmlFor="">Fahrenheit</label>
            <input type="number"
            id="celsius"
            value={formateValue(fahrenhit)}
            onChange={(event)=>handleFahrenheitToCelsius(event.target.value)}
            placeholder="32"
            />

        </div>

    </div>
  );
}

export default Tempconverter;