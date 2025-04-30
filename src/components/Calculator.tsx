
import React, { useState } from 'react';
import { Calculator as CalculatorIcon, Plus, Minus, X, Divide, Equal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState('');
  const { toast } = useToast();

  const clearDisplay = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setHistory('');
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue == null) {
      setPrevValue(display);
      setWaitingForOperand(true);
      setOperator(nextOperator);
      setHistory(`${display} ${nextOperator} `);
      return;
    }

    const previousValue = parseFloat(prevValue);
    let newValue;

    switch (operator) {
      case '+':
        newValue = previousValue + inputValue;
        break;
      case '-':
        newValue = previousValue - inputValue;
        break;
      case '×':
        newValue = previousValue * inputValue;
        break;
      case '÷':
        if (inputValue === 0) {
          toast({
            title: "Error",
            description: "Cannot divide by zero",
            variant: "destructive"
          });
          clearDisplay();
          return;
        }
        newValue = previousValue / inputValue;
        break;
      default:
        newValue = inputValue;
    }

    const formattedValue = Number.isInteger(newValue) 
      ? newValue.toString() 
      : newValue.toFixed(8).replace(/\.?0+$/, '');

    setDisplay(formattedValue);
    setPrevValue(formattedValue);
    setWaitingForOperand(true);
    setOperator(nextOperator);
    
    if (nextOperator === '=') {
      setHistory(`${history}${display} = ${formattedValue}`);
      setPrevValue(null);
      setOperator(null);
    } else {
      setHistory(`${formattedValue} ${nextOperator} `);
    }
  };

  const CalculatorButton = ({
    onClick,
    className,
    children,
    ...props
  }: {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
  }) => {
    return (
      <button
        className={cn(
          'flex items-center justify-center h-16 md:h-14 rounded-xl text-xl font-semibold transition-all duration-200 active:animate-button-press shadow-sm',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  return (
    <div className="bg-calculator-bg p-6 rounded-3xl shadow-lg max-w-xs mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-calculator-text flex items-center gap-2">
          <CalculatorIcon className="w-5 h-5" />
          Calculator
        </h2>
        {history && <p className="text-sm text-calculator-text-secondary">{history}</p>}
      </div>
      
      <div className="bg-calculator-display mb-6 p-4 rounded-xl shadow-inner">
        <div className="text-right text-3xl font-bold text-calculator-text overflow-hidden text-ellipsis">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <CalculatorButton 
          onClick={clearDisplay}
          className="bg-calculator-clear hover:bg-calculator-clear-hover text-calculator-text"
        >
          C
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => setDisplay(parseFloat(display) > 0 ? '-' + display : display.replace('-', ''))}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          +/-
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => setDisplay((parseFloat(display) / 100).toString())}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          %
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation('÷')}
          className="bg-calculator-operator hover:bg-calculator-operator-hover text-white"
        >
          <Divide className="w-5 h-5" />
        </CalculatorButton>
        
        <CalculatorButton 
          onClick={() => inputDigit('7')}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          7
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => inputDigit('8')}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          8
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => inputDigit('9')}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          9
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation('×')}
          className="bg-calculator-operator hover:bg-calculator-operator-hover text-white"
        >
          <X className="w-5 h-5" />
        </CalculatorButton>
        
        <CalculatorButton 
          onClick={() => inputDigit('4')}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          4
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => inputDigit('5')}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          5
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => inputDigit('6')}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          6
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation('-')}
          className="bg-calculator-operator hover:bg-calculator-operator-hover text-white"
        >
          <Minus className="w-5 h-5" />
        </CalculatorButton>
        
        <CalculatorButton 
          onClick={() => inputDigit('1')}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          1
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => inputDigit('2')}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          2
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => inputDigit('3')}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          3
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation('+')}
          className="bg-calculator-operator hover:bg-calculator-operator-hover text-white"
        >
          <Plus className="w-5 h-5" />
        </CalculatorButton>
        
        <CalculatorButton 
          onClick={() => inputDigit('0')}
          className="col-span-2 bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          0
        </CalculatorButton>
        <CalculatorButton 
          onClick={inputDecimal}
          className="bg-calculator-number hover:bg-calculator-number-hover text-calculator-text"
        >
          .
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => performOperation('=')}
          className="bg-calculator-equal hover:bg-calculator-equal-hover text-white"
        >
          <Equal className="w-5 h-5" />
        </CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;
