import React, { useState } from "react";
import "./App.scss";

export default function App() {
  const [input, setInput] = useState("0");      // Mostra sempre l’input corrente
  const [formula, setFormula] = useState("");   // Formula completa interna
  const [evaluated, setEvaluated] = useState(false);

  // Funzione per aggiungere numeri
  const handleNumber = (num) => {
    if (evaluated) {
      setInput(num);
      setFormula(num);
      setEvaluated(false);
    } else if (input === "0") {
      setInput(num);
      setFormula(formula + num);
    } else {
      setInput(input + num);
      setFormula(formula + num);
    }
  };

  // Funzione per aggiungere operatori
  const handleOperator = (op) => {
    if (evaluated) {
      setFormula(input + op);
      setInput(op);
      setEvaluated(false);
    } else {
      let tempFormula = formula;

      // Sostituisci l’ultimo operatore se presente (eccetto "-" come segno negativo)
      if (/[+\-*/]$/.test(formula)) {
        if (op === "-" && !/[-]$/.test(formula)) {
          tempFormula += op; // segno negativo
        } else {
          tempFormula = formula.replace(/[+\-*/]+$/, "") + op;
        }
      } else {
        tempFormula += op;
      }

      setFormula(tempFormula);
      setInput(op);
    }
  };

  // Funzione per decimal
  const handleDecimal = () => {
    if (evaluated) {
      setInput("0.");
      setFormula("0.");
      setEvaluated(false);
    } else if (!/\.\d*$/.test(input)) {
      setInput(input + ".");
      setFormula(formula + ".");
    }
  };

  // Funzione per clear
  const handleClear = () => {
    setInput("0");
    setFormula("");
    setEvaluated(false);
  };

  // Funzione per "="
  const handleEquals = () => {
    try {
      // Calcolo solo quando formula valida
      let exp = formula.replace(/×/g, "*").replace(/÷/g, "/");
      let result = eval(exp);
      result = Math.round(result * 10000) / 10000;

      setInput(result.toString());
      setFormula(result.toString());
      setEvaluated(true);
    } catch {
      setInput("Error");
      setFormula("");
      setEvaluated(true);
    }
  };

  // Array pulsanti
  const numbers = [
    { id: "zero", value: "0" }, { id: "one", value: "1" }, { id: "two", value: "2" },
    { id: "three", value: "3" }, { id: "four", value: "4" }, { id: "five", value: "5" },
    { id: "six", value: "6" }, { id: "seven", value: "7" }, { id: "eight", value: "8" },
    { id: "nine", value: "9" }
  ];

  const operators = [
    { id: "add", value: "+" },
    { id: "subtract", value: "-" },
    { id: "multiply", value: "*" },
    { id: "divide", value: "/" }
  ];

  return (
    <div className="calculator">
      <div id="display">{input}</div>

      <div className="buttons">
        <button id="clear" className="btn-clear" onClick={handleClear}>AC</button>

        {operators.map((op) => (
          <button
            key={op.id}
            id={op.id}
            className="btn-operator"
            onClick={() => handleOperator(op.value)}
          >
            {op.value}
          </button>
        ))}

        {numbers.map((num) => (
          <button
            key={num.id}
            id={num.id}
            className="btn-number"
            onClick={() => handleNumber(num.value)}
          >
            {num.value}
          </button>
        ))}

        <button id="decimal" className="btn-decimal" onClick={handleDecimal}>.</button>
        <button id="equals" className="btn-operator" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}