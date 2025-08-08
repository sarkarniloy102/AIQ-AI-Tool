

function App() {


  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        {/* sidebar */}
        <div className="col-span-1 bg-zinc-800">

        </div>
        {/* content */}
        <div className="col-span-4">
          <div className="container h-140">

          </div>
          <div className="bg-zinc-800 w-1/2 h-14 p-1 pr-4 m-auto text-white rounded-4xl border border-zinc-500 flex justify-center items-center ">
            <input
              type="text"
              placeholder="Ask Me Anything"
              className="w-full h-full p-3 outline-none" />
            <button className="">Ask</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
