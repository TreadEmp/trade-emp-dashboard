import React from "react";
import Image from 'next/image'

import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "../../components/Navbars/AuthNavbar.js";
import FooterSmall from "../../components/Footers/FooterSmall.js";

// views

import Login from "./auth/Login.js";

const  Index = ({history})  => {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + "/assets/img/register_bg_2.png" + ")",
            }}
          ></div>
          <Login history={history}/>
        </section>
      </main>
    </>
  );
}

Index.layout = "Login";
export default Index;
