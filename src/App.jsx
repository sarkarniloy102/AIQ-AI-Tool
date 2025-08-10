import { useState } from "react"
import { URL } from "./Constants";
import Answers from "./Components/Answers";


function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(undefined);

  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }

  const handleAskQues = async () => {
    // URL = gemini api key url
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    const data = await response.json();
    const dataString = data.candidates[0].content.parts[0].text;
    // console.log(dataString.split("* "));
    const dataArray = dataString.split("* ").map(item => item.trim());

    setResult(dataArray)

    console.log(dataArray);
  }


  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        {/* sidebar */}
        <div className="col-span-1 bg-zinc-800">

        </div>
        {/* content */}
        <div className="col-span-4  ">
          <div className="container h-140 p-10 overflow-y-scrolls overflow-x-hidden">
            <div className="text-white">
              {
                result && result.map((item, idx) => (
                  <Answers
                    key={idx}
                    ans={item}
                    idx={idx}></Answers>
                ))
              }
            </div>

          </div>
          <div className="bg-zinc-800 w-1/2 h-14 p-1 pr-4 m-auto text-white rounded-4xl border border-zinc-500 flex justify-center items-center ">
            <input
              type="text"
              placeholder="Ask Me Anything"
              className="w-full h-full p-3 outline-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)} />
            <button onClick={handleAskQues} className="cursor-pointer">Ask</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
