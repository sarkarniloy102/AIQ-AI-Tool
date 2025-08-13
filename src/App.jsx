import { useState } from "react"
import { URL } from "./Constants";
import Answers from "./Components/Answers";
import History from "./Components/History";
import { getHistory, saveHistory } from "./Utils/Storage";


function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [recentHistory, setrecentHistory] = useState(getHistory());

  // intregate gemini api
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

    if (!question) {
      return false;
    }

    const updatedHistory = saveHistory(question);
    setrecentHistory(updatedHistory);
    // URL = gemini api key url
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    const data = await response.json();
    const dataString = data.candidates[0].content.parts[0].text;
    // console.log(dataString.split("* "));
    const dataArray = dataString.split("* ").map(item => item.trim());

    setResult([...result, { type: 'q', text: question }, { type: 'a', text: dataArray }])
    setQuestion('');
    // console.log(dataArray);
  }


  // submit question on Enter
  const isEnter = (e) => {
    if (e.key === 'Enter') {
      handleAskQues();
    }
  }


  return (
    <>
      <div className="grid grid-cols-5 h-screen text-center">
        {/* sidebar */}
        <div className="col-span-1 bg-zinc-800">
          <History recentHistory={recentHistory} setRecentHistory={setrecentHistory}></History>
        </div>
        {/* content */}
        <div className="col-span-4  ">
          <div className="container h-155 p-10  overflow-auto overscroll-auto">
            <div className="text-zinc-100">
              {

                result.map((item, idx) => (

                  item.type == 'q' ?
                    <Answers
                      key={idx + Math.random()}
                      className="text-right text-7xl border border-zinc-600 p-1"
                      ans={item.text}
                      totalResult={1}
                      flag={0}
                      idx={idx}></Answers> :

                    item.text.map((ansItem, ansIndex) => (
                      <Answers
                        key={ansIndex + Math.random()}
                        className="text-left p-1"
                        ans={ansItem}
                        totalResult={1}
                        flag={1}
                        idx={ansIndex}></Answers>
                    ))
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
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={isEnter} />
            <button onClick={handleAskQues} className="cursor-pointer">Ask</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
