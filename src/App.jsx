import "./App.css";
import { useEffect, useState } from "react";
import Modal from "./component/modal/Modal";

function App() {
  const [change, setChange] = useState();
  const [arr, setArr] = useState([]);
  const [newarr, setnewArr] = useState([]);
  const [toggle, setToggle] = useState(false);
  const key =
    "dict.1.1.20230422T102651Z.659e1714e1681317.a09c36b0652018c650a74348d6232fcd3d52808b";

  const ru = /^[А-я]/;
  const api = useEffect(() => {
    fetch(
      `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${
        ru.test(change) ? "ru-en" : "en-ru"
      }&text=${change === "" ? "a" : change}`
    )
      .then((response) => response.json())
      .then((json) => setArr(json.def));
  }, [change]);

  const haddleClick = (id) => {
    setnewArr(
      arr.filter((item) => {
        const { text, pos } = item;
        return id === text + pos;
      })
    );
  };
  return (
    <div className="App bg-slate-800 min-h-[100vh] p-5">
      {/* HEADER */}
      <div className="">
        <h1 className=" text-5xl font-bold text-white w-full md:w-2/3 py-5 mx-auto bg-slate-600 rounded-lg shadow-lg shadow-slate-500">
          En-Ru Dictionary
        </h1>
      </div>

      {/* INPUT */}
      <div className=" flex bg-slate-200 w-full md:w-2/3 mb-5 mt-10 rounded shadow-md shadow-slate-400 mx-auto">
        <input
          onChange={(e) => {
            setChange(e.target.value.trim());
          }}
          placeholder="search"
          type="text"
          className=" w-full py-2 border-none px-2 bg-transparent outline-none"
        />
        <button
          onClick={(e) => {
            console.log((e.target.previousElementSibling.value = ""));
          }}
          className=" px-2 bg-slate-500 text-white m-px rounded">
          reset
        </button>
      </div>

      {/* WORDS */}
      <div className=" shadow-md shadow-slate-500 w-full md:w-2/3 rounded bg-slate-600 py-5 mx-auto">
        {/* MAP */}
        {arr.map((e, i) => {
          const { text, pos, tr, es } = e;
          const id = text + pos;
          return (
            <div
              key={id}
              onClick={(e) => {
                haddleClick(id);
                setToggle(true);
              }}
              className=" group duration-100 hover:bg-slate-500 px-2 my-px">
              <div className="flex items-center justify-between">
                <p className="text-left flex items-center gap-2">
                  <span className=" text-white font-semibold text-2xl group-hover:underline">
                    {text}
                  </span>
                  <span className=" text-slate-400">{pos}</span>
                </p>
              </div>
              <div className="text-left text-base text-slate-300">
                {tr.map(({ text }) => {
                  return <span>{text}, </span>;
                })}
              </div>
            </div>
          );
        })}
        {/* MODAL */}
        <div className={toggle ? "block" : "hidden"}>
          <Modal setClose={setToggle} all={newarr} />
        </div>
      </div>
    </div>
  );
}

export default App;
