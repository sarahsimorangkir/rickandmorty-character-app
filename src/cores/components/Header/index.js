import React from "react";
import styles from './index.module.css'

const Header = ({navigate, ...props}) => {
  return (
    <div className={"bg-light h-350 text-center text-black p-4 "}>
      
      <button className={"btn btn-dark d-flex float-right"} onClick={()=> navigate("/locations")}>Locations</button>
      <h1 className={"font-weight-bold"}>The Rick and Morty Characters<span>.</span></h1>
    </div>
  );
};

export default Header;
