import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizTime, setQuizTime] = useState(1800);
  const [answers, setAnswers] = useState([]);
  const [alerted, setAlerted] = useState(false);
  const [amount, setAmount] = useState(10);
  const [questionType, setQuestionType] = useState("multiple");

  const navigate = useNavigate();

  const fetchQuestions = async (categoryId, difficulty) => {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${questionType}`
      );
      const data = await res.json();

      if (!data.results || !Array.isArray(data.results)) {
        alert("❌ No questions found. Try a different setup.");
        return;
      }

      const formatted = data.results.map((q) => ({
        question: q.question,
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
        answer: q.correct_answer,
      }));

      setQuestions(formatted);
      setCurrentQ(0);
      setScore(0);
      setShowScore(false);
      setQuizTime(1800);
      setAnswers(Array(formatted.length).fill(null));
      setAlerted(false);
    } catch (err) {
      console.error("Error fetching questions:", err);
      alert("❌ Failed to fetch questions. Please try again.");
    }
  };

  const handleAnswer = (option) => {
    if (showScore) return;
    const updated = [...answers];
    updated[currentQ] = option;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const submitQuiz = async () => {
    let total = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) total += 1;
    });
    setScore(total);
    setShowScore(true);

    const categoryName = categories.find(
      (c) => c.id.toString() === selectedCategory
    )?.name;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.NEXT_PUBLIC_HOST}/api/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          category: categoryName,
          difficulty: selectedDifficulty,
          score: total,
          totalQuestions: questions.length,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save report");
      }

      console.log("✅ Quiz report saved:", data);
    } catch (err) {
      console.error("❌ Failed to save quiz report:", err.message);
    }
  };

  useEffect(() => {
    if (!questions.length || showScore) return;

    if (quizTime === 0) {
      submitQuiz();
      return;
    }

    if (quizTime === 60 && !alerted) {
      alert("⏳ Only 1 minute remaining!");
      setAlerted(true);
    }

    const interval = setInterval(() => setQuizTime((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [quizTime, questions, showScore, alerted]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const getOptionStyle = (opt, index) => {
    if (!showScore) return {};
    const correct = questions[index].answer;
    const selected = answers[index];

    if (opt === correct) return { backgroundColor: "#c8f7c5" };
    if (opt === selected) return { backgroundColor: "#f7c5c5" };
    return {};
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>React Quiz App</h2>
        {questions.length > 0 && !showScore && (
          <div className="timer">Time Left: {formatTime(quizTime)}</div>
        )}
      </div>

      {!questions.length && (
        <>
          <div className="form-group">
            <label>Select Category:</label>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Choose a category
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label>Select Difficulty:</label>
            <select
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Choose difficulty
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <div className="setup-container">
              <label>Number of Questions______:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <label>Question Type:</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>

            <br />
            <button
              onClick={() =>
                fetchQuestions(selectedCategory, selectedDifficulty)
              }
              disabled={!selectedCategory || !selectedDifficulty}
            >
              Start Quiz
            </button>
          </div>
        </>
      )}

      {questions.length > 0 && !showScore && (
        <div>
          <h4>
            Question {currentQ + 1} of {questions.length}
          </h4>
          <p
            dangerouslySetInnerHTML={{ __html: questions[currentQ].question }}
          ></p>

          {questions[currentQ].options.map((opt, i) => (
            <label
              key={i}
              style={{
                display: "block",
                margin: "5px 0",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <input
                type="checkbox"
                checked={answers[currentQ] === opt}
                onChange={() => handleAnswer(opt)}
              />{" "}
              <span dangerouslySetInnerHTML={{ __html: opt }} />
            </label>
          ))}

          <div className="navigation-buttons">
            <button onClick={prevQuestion} disabled={currentQ === 0}>
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQ === questions.length - 1}
            >
              Next
            </button>

            {answers.length === questions.length &&
              answers.every((ans) => ans !== null) && (
                <button onClick={submitQuiz} style={{ marginLeft: "10px" }}>
                  Submit
                </button>
              )}
          </div>
        </div>
      )}

      {showScore && (
        <div>
          <h3>
            Your Score: {score} / {questions.length}
          </h3>

          <div
            style={{ maxHeight: "60vh", overflowY: "auto", marginTop: "20px" }}
          >
            {questions.map((q, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h4>Question {index + 1}</h4>
                <p dangerouslySetInnerHTML={{ __html: q.question }}></p>
                {q.options.map((opt, i) => {
                  const isCorrect = opt === q.answer;
                  const isSelected = answers[index] === opt;
                  let style = {};
                  if (isCorrect) style.backgroundColor = "#c8f7c5";
                  else if (isSelected && opt !== q.answer)
                    style.backgroundColor = "#f7c5c5";

                  return (
                    <label
                      key={i}
                      style={{
                        display: "block",
                        margin: "5px 0",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        ...style,
                      }}
                    >
                      <input type="checkbox" checked={isSelected} disabled />{" "}
                      <span dangerouslySetInnerHTML={{ __html: opt }} />
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setQuestions([]);
              setShowScore(false); // 👈 Hide the score section
              setScore(0); // 👈 Reset score
              setAnswers([]); // 👈 Clear previous answers
              setSelectedCategory(""); // 👈 Optional: reset category
              setSelectedDifficulty(""); // 👈 Optional: reset difficulty
            }}
            disabled={!showScore} // 👈 Optional: disable if score isn’t being shown
          >
            Try Another Category
          </button>
        </div>
      )}
    </div>
  );
}
