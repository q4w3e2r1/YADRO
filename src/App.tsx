import { Provider } from 'react-redux';
import { store } from './store/store';
import DataVisualization from './components/DataVisualization/DataVisualization';
import ButtonBar from './components/ButtonBar/ButtonBar.component';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { changeDataSet, clearData } from './store/dataSlice';
import { exportToCSV } from './utils/csvExport';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { headers, tableData } = useAppSelector((state) => state.data);
  
  const handleFirstClick = () => {
    dispatch(changeDataSet());
  };
  
  const handleSecondClick = () => {
    dispatch(clearData());
  };
  
  const handleThirdClick = () => {
    if (tableData.length > 0) {
      exportToCSV(headers, tableData);
    } else {
      alert('Нет данных для сохранения');
    }
  };

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
