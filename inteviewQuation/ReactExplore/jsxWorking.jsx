import React from "react";

const jsxWorking = () => {
  // JSX (JavaScript XML) lets us write HTML-like code inside JavaScript.
  // It makes it easier to describe the UI in React.

  //jsx is like mixture of html ans js that you can write html in js code
  //react look like HTML but behave like javaScript

  //jsx is not HTML - its's syntactic sugar over React.createElement()

  //Proper Defination
  //// JSX (JavaScript XML) is a syntax extension for JavaScript used in React to describe UI <= full form of jsx
  //It lets you write HTML-like code inside javaScript.

  //JSX style is an object {{}},not a string
  //WE have to write css in CamelCase backgroundColor, fontSize ,if you  want to write css in
  //normal way like {{ "background-colur" : "red"} } like this ,BUt best pratice is camel case

  //jsx is an Expression == Assign it to varibles
  //pass as props, return from function //ex let a = <p> hi this is sum {2+2} </p>

  //Behind the Scenes =>comiled to React.createElement() behind the scenes. //this is syntatic Suger
  // jsx=> const elem = <h1>Hello, Scholl</h1>
  //compile const elem=React.createElement("h1",null,"Heloo",Scholl);
  // in this Raact.createElement paremant  first=htML  SECOND => Props third will the data =>hello,school ,...children

  //<h1 className='heading' color:'red' hight:'5rem'>Hello</h1> compite=>
  // React.createElement('h1', {className: 'heading' { color:'red',hight:5rem }}, 'hello')

  // <div>
  //     <p style:{color:red}>helo</p>
  // </div>
  /*
     =>>  React.createElement(
     'div',
     null,
     React.createElement(
     'p',
     {style:{color:red}},
     'helo'
     )
    )
    */

  //in react the no childe in the elemet  are self closeing like <br/> <img/> <hr/>
  //if else cant use directly ==> use ternary or logical &&
  //jsx supports only expresioin inside {}-not statement.

  const isAdmin = true;
  let arr = ["hi", "hy", "heloo"];
  return (
    <>
      <div>jsxWorking</div>
      //this is Short-circuit rendering //this is comdtion rendering
      {true && <p>hyy</p>}
      //we cant use forEach or if else are the stament //why can we use map is a
      function in this map(); mpa is higher order function it take a function
      inside it
      {arr.map(function (elem, idx) {
        return <h1 key={idx}>{elem}</h1>;
      })}
    </>
  );
};

export default jsxWorking;
