import React, { useEffect, useState, useRef } from "react";
import "./QuizReportList.css";

const QuizReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("token");

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${import.meta.env.NEXT_PUBLIC_HOST}/api/report/myscores`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });
        const data = await res.json();
        setReports(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch reports", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, [authToken]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(index % 2 === 0 ? "slide-in-left" : "slide-in-right");
            entry.target.classList.remove("slide-out-left", "slide-out-right");
          } else {
            entry.target.classList.remove("slide-in-left", "slide-in-right");
            entry.target.classList.add(index % 2 === 0 ? "slide-out-left" : "slide-out-right");
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = containerRef.current?.querySelectorAll(".quiz-report-item");
    items?.forEach((item) => observer.observe(item));

    return () => items?.forEach((item) => observer.unobserve(item));
  }, [reports]);

  if (loading) return <p>Loading quiz reports...</p>;

  if (reports.length === 0) return <p>No reports available</p>;

  const sortedReports = [...reports].sort((a, b) => b.score - a.score);
  const highestScore = sortedReports[0];

  return (
    <div className="quiz-report-container" ref={containerRef}>
      <h2>Your Quiz Reports</h2>

      <div className="highest-score-section">
        <h3>🏆 Highest Score</h3>
        <div className="quiz-report-item highlight">
          <p><strong>Category:</strong> {highestScore.category}</p>
          <p><strong>Difficulty:</strong> {highestScore.difficulty}</p>
          <p><strong>Score:</strong> {highestScore.score}</p>
          <p className="taken-on">
            <em>
              Taken on:{" "}
              {new Date(highestScore.takenAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </em>
          </p>
        </div>
      </div>

      <div className="quiz-report-list">
        {sortedReports.map((report, idx) => (
          <li key={idx} className="quiz-report-item">
            <p><strong>Category:</strong> {report.category}</p>
            <p><strong>Difficulty:</strong> {report.difficulty}</p>
            <p><strong>Score:</strong> {report.score}</p>
            <p className="taken-on">
              <em>
                Taken on:{" "}
                {new Date(report.takenAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </em>
            </p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default QuizReportList;
