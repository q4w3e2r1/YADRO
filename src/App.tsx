import { useState } from 'react'
import ButtonBar from './components/ButtonBar/ButtonBar.component'
import './App.css'
import DataVisualization from './components/DataVisualization/DataVisualization'

function App() {
  const handleFirstClick = () => console.log('Кнопка 1 нажата');
  const handleSecondClick = () => console.log('Кнопка 2 нажата');
  const handleThirdClick = () => console.log('Кнопка 3 нажата');

  return (
    <>
    <ButtonBar onFetch={handleFirstClick} onClear={handleSecondClick} onSave={handleThirdClick} />
    <DataVisualization />
    </>
  );
}

export default App
