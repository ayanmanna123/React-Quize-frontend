import React, { useEffect, useState, useRef } from 'react';
import './TopScores.css';

const TopScores = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(`${import.meta.env.NEXT_PUBLIC_HOST}/api/report/all`);
        const data = await res.json();

        // Sort scores from highest to lowest
        const sorted = data.sort((a, b) => b.score - a.score);
        setScores(sorted);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top scores:", error);
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          if (entry.isIntersecting) {
            element.classList.add('visible');
          } else {
            element.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [scores]);

  if (loading) return <p>Loading top scores...</p>;

  return (
    <div className="top-scores-container">
      <h2>🏆 Top Quiz Scores</h2>
      {scores.length === 0 ? (
        <p>No scores available</p>
      ) : (
        <div className="score-list">
          {scores.map((item, idx) => (
            <div
              className={`score-card ${idx % 2 === 0 ? 'animate-left' : 'animate-right'}`}
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
            >
              <h5><strong>Name:</strong> {item.name}</h5>
              <p><strong>Score:</strong> {item.score}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Difficulty:</strong> {item.difficulty}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopScores;

