import { Provider } from 'react-redux';
import { store } from './store/store';
import DataVisualization from './components/DataVisualization/DataVisualization';
import ButtonBar from './components/ButtonBar/ButtonBar.component';
import { useAppDispatch } from './store/hooks';
import { changeDataSet, clearData } from './store/dataSlice';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const handleFirstClick = () => {
    dispatch(changeDataSet());
  };
  
  const handleSecondClick = () => {
    dispatch(clearData());
  };
  
  const handleThirdClick = () => console.log('Кнопка 3 нажата');

  return (
    <>
      <ButtonBar onFetch={handleFirstClick} onClear={handleSecondClick} onSave={handleThirdClick} />
      <div className="App">
        <DataVisualization />
      </div>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
