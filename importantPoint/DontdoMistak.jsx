const { useState, useEffect } = require("react");


function Counter(){
    const [counter, setCounter]=useState(0);

    const handleClick= ()=>{
        setCounter(counter+1) // the value is send just not change yet so it scheduling a state insate of updated //thte react will upate in the future
        setCounter(counter+1) // same for this not udated the upper value using the same counte vraibale
        setCounter(counter+1) // int this the  value will be increes by one only beassuse

        // ast hte end after this run the value will increes by one only
    }
    // to solve this problen we will take the prev

    const handleClick2=()=>{
        setCounter(prev=>prev+1);
        setCounter(prev=>prev+1);
        setCounter(prev=>prev+1);
        //in thie the value is incrrees by 3
    }
}


//2
export default function(){
    const[user,setUser]=useState({name:"",city:"", age:50});


    const handleOnChange=(e)=>{
        setUser({
            name:e.taget.value,
        })
        //if i log user the will give me the only name updateed only like we t this will give name:t in log
        //for very city anme and age what in upadted users you should use

        setUser({
            ...user, //this will copy user object and give whwne we upadated 
            name : e.taget.value,  // this will give the all value on change the name also /this will overwrite that
        })

        setUser(user.name=e.taget.value)// this will give the error we need to give the object
    }
}


export default function form(){

    // in genreal we make the all set for this dont make the state for veeryu elemt liker pass name 
    // for this user object
    const [from, setForm] = useState({
        firstName: "",
        lastName : "",
        email: "",
        password: "",
        address:"",
    })

    const handleChange= (e)=>{
        setForm({
            ...from, //this is copy every think from the (form)
            firstName:e.target.value, // this will take tth firstname name as name firtname from the form
            lastName:e.taget.value, // this will take the same name for all
            email:e.taget.value,

            //to solve this will take the name fomr the lable and same form the object we will do
            ...from,
            [e.taget.name] : e.taget.value, // this is best 
        });
    }

    <form>
<input type="text" name="firstName" onClick={handleChange}/> {/* the name in the same in object of state */}
<input type="text" name="lastName" onClick={handleChange}/>
<input type="text" name="email" onClick={handleChange}/>
    </form>
}





const Price_perItem=5;

export default function Card(){

    const [quantity,setQuantity]=useState(1);
    const [totalPrice,setTotalPice]=useState(0);

    const handleClick=()=>{
        setQuantity(prev=>prev+1);
    }

    useEffect(()=>{
        setTotalPice(quantity*Price_perItem);
    },[quantity]) // when evey quanty change the call this function to gete totoal price

    //this is not good pratic deepn on useState
    //we Will simply do

    const totalPrice2 = quantity * Price_perItem;
    // this will be same without UseState 


    //example one more

    const [firstName,setfirstName] = useState('');
    const [lastName,setLastName] = useState('');
    // const [fullName,setfullName] = useState(''); // not need to user again sate for full name

    const fullName=firstName+lastName;


}


export default function Price(){
    console.log("Componet Rendereing");
    const[price, setPrince]=useState(0);

    const handleClick = ()=>{
        setPrince(0) // we pass the same value to changte hte copomnet not will rendernre it gain 
        // samee fo the string and boolen also
        //beause of primative == pass by value
    }

    //if we have the oobject
    const[price1, setPrince1]=useState({
        number : 100,
        totalPrice : true,
    });

    const handleClick2= () =>{
        setPrince2({
            number : 100,
            totalPrice : true, // when th object it same value  it will re render again
            //object are non premative // this array are passed by refence // you are not working about the object 
            // you are working with the refrence // abothe the address are diffrent
        })
    }

    useEffect(()=>{

    //use prices1.number
    },[price1]) //if i give simply price it will all time call if value is same use (prices.number)
    
};


export default function blogPost(){
    const [post, setPost]=useState(null);

    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        fetch("https://dummyjson.com/posts/1")
        .then((res)=>res.json())
        .then((data)=>{
            setPost(data)
            setLoading(false);
        })
    })

    return(
        <>
        <h1>{post.title}</h1> // herre is the catch that thia will render first then useEffect it will get error  
        <h1>{post.body}</h1> //same for  this

        //frr solve this problem user (?)

        <h1>{post?.title}</h1> // it not throw error 
        <h1>{post?.body}</h1>


        // another solution is use Loading state

        {
            loading ? ("Loading") : (
                <>
                 <h1>{post.title}</h1> 
                 <h1>{post.body}</h1>
                </>
            )
        }


        </>
    );
}



const useWindowSize = ()=>{ // making a custom hook to user evrey where 
    const [windowSize, setWindowSize]=useState(1920);

      useEffect(()=>{
        const hadnleWindowSizeChange = ()=>{
            setWindowSize(window.innerWidth);
        };
        window.addEventListener("resize",hadnleWindowSizeChange);


        return ()=>{ // use this all time
            window.removeEventListener("resize", hadnleWindowSizeChange);
        }
    },[]);

    return windowSize;
}


export default function ExampleComponent1(){
    // const [windowSize, setWindowSize]=useState(1920);

    // useEffect(()=>{
    //     const hadnleWindowSizeChange = ()=>{
    //         setWindowSize(window.innerWidth);
    //     };
    //     window.addEventListener("resize",hadnleWindowSizeChange);


    //     return ()=>{ // use this all time
    //         window.removeEventListener("resize", hadnleWindowSizeChange);
    //     }
    // },[])

    const windowSize =useWindowSize()

    return <div>Component 1</div>;
}
export function ExampleComponent2(){
    //want tot same state in useeffct in this function
   const windowSize =useWindowSize()

    return <div>Component2</div>;
}




//

export default function CounterExample(){
    const[count,setCount]=useState(0);

  // classic stale closure problem in React. in this function
    useEffect(()=>{
        const i= setInterval(()=>{
            console.log("Interval functon running....");
            setCount(count+1);  
              //in tho useeffect runs ones js not recretre the function every second
              // this varibale like count crete on function creted time only
               //So every second, it does setCount(0 + 1) → which always sets it to 1.
              // at first the count is 0 => goes to 1 then setCount(1); then not cahnge same value all time

        },1000);
        // to solve this problem give ddependency [count] , now this will work proberly with it wll give hickup  lack like

        return ()=>{
            clearInterval(i);
        }
    },[])//[count]

    // this is most clerer version

    useEffect(() => {
        const id = setInterval(() => {
            console.log("Interval function running....");
            setCount(prev => prev + 1);  // ✅ functional update
        }, 1000);

        return () => clearInterval(id); // ✅ cleanup on unmount
    }, []);

    return <p>count is {count}</p>;
}




// id is coming from diffrent function rondom click
export default function postbody({id}){
    const [text,setText]= useState("");

    useEffect(()=>{
        const controler=new AbortController();

        fetch(`https://dummyjson.com/posts/${id}`,{
            signal:controler.signal  // aatech the signla to featch from abortController
        })
        .then((res)=>res.json)
        .then((data) => setText(data.body));


        return ()=>controler.aboard(); // clear all preves fetch call givr the alt call only so use AbordController
    }, [id]);

    return <p>{text}</p>;
}
