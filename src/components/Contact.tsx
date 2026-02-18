

// function Parent() {
//   const  message = "Hello, I am a developer."
//   return (
//     <div>
//       <h1>{message}</h1>
//     </div>
//   )
// }

// function Child({message}) {
//   return  (
//     <div>
//       <Grandchild message={message}/>
//     </div>
//   )

// }

// function Grandchild({message}) {
//   return (
//     <div>
//       <p>Message: {message}</p>
//     </div>
//   )
// }

// export default function Contact() {
//   return (
//     <div>
//       <Parent />
//     </div>
//   );
// }
// Use Context API instead.
///////////////////////////////////
//Using Context API
// import { createContext, useContext } from "react";
// const UserContext = createContext();

// const Contact = () => {
//   const userName = "Leonardo Oluoch";
//   return (
//     < UserContext.Provider value={userName}>
//       <Parent/>
//     </UserContext.Provider>
//   );
// };

// const Parent = () => {
//   return <Child/>;
// }

// const Child = () => {
//   return <GrandChild/>;
// }

// const GrandChild = () => {
//   const userName = useContext(UserContext)
//   return <p>Hello {userName}!</p>
// }
// export default Contact;
//////////////////////////////////

// import { createContext, useContext } from "react";
// const UserContext = createContext();
// const useUser = () => { return useContext(UserContext); };

// const Contact = () => {
//   const userName = "Leonardo Oluoch";
//   return (
//     <UserContext.Provider value={userName}>
//       <Component />
//     </UserContext.Provider>
//   );
// };

// const Component = () => {
//   return <Child/>;
// }

// const Child = () => {
//   return <Grand />;
// };

// const Grand = () => {
//   const userName = useUser();
//   return <p>Hello, {userName}!</p>;
// };

// export default Contact;
////////////////////////////////////////////

import React from 'react'

const Contact = () => {
  return (
    <div>
      <h1>Hey</h1>
    </div>
  )
}

export default Contact
