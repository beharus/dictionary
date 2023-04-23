import React, { useState } from "react";

function Modal({ setClose, all }) {
  return (
    <>
      {all.map(({ text, pos, ts, tr }) => {
        return (
          <div
            onClick={(e) =>
              e.target.className.includes("modal")
                ? setClose(false)
                : setClose(true)
            }
            className="modal flex items-center justify-center  fixed top-0 bottom-0 left-0 right-0 bg-[#00000050] backdrop-blur">
            <div className="w-2/3 bg-slate-800 p-2 rounded shadow-md shadow-slate-500 border-slate-400 border">
              <h2 className=" text-left text-2xl text-white font-bold">
                {text}  {`| {${ts}}`.includes("undefined") ? "" : `| {${ts}}`}
              </h2>
              <hr />
              <p className=" mt-5 text-slate-400 text-left">{pos}</p>
              <div className="text-left text-base text-slate-300">
                {tr.map(({ text }) => {
                  return <li>{text}</li>;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Modal;
