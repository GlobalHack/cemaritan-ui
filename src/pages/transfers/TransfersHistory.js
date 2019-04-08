import React, { useState, useEffect } from "react";

function TransfersHistory() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://opentdb.com/api.php?amount=1&category=27&difficulty=easy&type=boolean`,
      )
      .then(res => res.json())
      .then(result => {
        console.log('FACT', result)
        setData(result.results[0]);
      })
    };

    fetchData();
  }, []);

  return (
    <div>This is a fact: {data.category}</div>
  );
}

export default TransfersHistory;
