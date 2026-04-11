import { Variable } from "lucide-react";
import React, { useState, useEffect } from "react";

const SAMPLE_TEXT =
  "type the draft and move back into the quick track mask the flash zone and bring calm focus pack your bag with bold help and shift every step on time";

function TypingTest() {
  const [text] = useState(SAMPLE_TEXT);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [errors, setErrors] = useState(0);

  const originalWords = text.split(" ");
  const typedWords = input.trim().split(" ");

  useEffect(() => { 
   let timer: ReturnType<typeof setInterval>;
 
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      finishTest();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTest = () => {
    if (!isRunning) setIsRunning(true);
  };

 const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isRunning) startTest();
    setInput(e.target.value);
  };

  const calculateWPM = () => {
    return input.trim().split(/\s+/).filter(Boolean).length;
  };

  const calculateErrors = () => {
    let errorCount = 0;

    typedWords.forEach((word, i) => {
      if (word !== originalWords[i]) {
        errorCount++;
      }
    });

    return errorCount;
  };
  useEffect(() => {
  if (isRunning && !isFinished) {
    setWpm(calculateWPM());
    setErrors(calculateErrors());
  }
}, [input]);

  const finishTest = () => {
    setIsRunning(false);
    setIsFinished(true);
    setWpm(calculateWPM());
    setErrors(calculateErrors());
  };

  const resetTest = () => {
    setInput("");
    setTimeLeft(60);
    setIsRunning(false);
    setIsFinished(false);
    setWpm(0);
    setErrors(0);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        width: "90%",
        margin: "40px auto",
        textAlign: "center",
        padding: "0 15px",
        boxSizing: "border-box",
      }}
    >
      <h1 className="mt-20 text-orange-500 font-bold">Typing Speed Test</h1>

      <div style={{ marginBottom: "10px" }}>
        <strong>WPM: {wpm}</strong> | <strong>Errors: {errors}</strong> |{" "}
        <strong style={{ color: "red" }}>Time: {timeLeft}s</strong>
      </div>

      {/* PARAGRAPH */}
      <div
        style={{
          background: "#111827",
          padding: "20px",
          borderRadius: "10px",
          fontSize: "18px",
          lineHeight: "1.8",
          color: "#fff",
          minHeight: "120px",
          textAlign: "left",

          // ✅ IMPORTANT FIX
          width: "100%",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
      >
        {originalWords.map((word, i) => {
          let color = "#9CA3AF";

          if (typedWords[i] != null) {
            color = typedWords[i] === word ? "#22c55e" : "#ef4444";
          }

          return (
            <span
              key={i}
              style={{
                marginRight: "8px",
                color,
                fontWeight: typedWords[i] ? "600" : "400",
                display: "inline-block", // ✅ prevents overflow issue
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {!isFinished ? (
        <textarea
          value={input}
          onChange={handleChange}
          placeholder="Start typing here..."
          style={{
            width: "100%",
            height: "140px",
            marginTop: "15px",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />
      ) : (
        <div style={{ marginTop: "20px" }}>
          <h2>⏱ Test Finished</h2>
          <h3>🚀 WPM: {wpm}</h3>
          <h3>❌ Errors: {errors}</h3>

          <button
            onClick={resetTest}
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Restart Test
          </button>
        </div>
      )}
    </div>
  );
}

export default TypingTest;