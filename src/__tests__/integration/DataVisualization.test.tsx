import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer, { clearData, changeDataSet } from '../../store/dataSlice';
import DataVisualization from '../../components/DataVisualization/DataVisualization';
import ButtonBar from '../../components/ButtonBar/ButtonBar.component';
import { dataSets } from '../../data/tableDataSets';
import { useAppDispatch } from '../../store/hooks';

jest.mock('../../utils/csvExport');

const TestComponent = () => {
  const dispatch = useAppDispatch();

  const handleFetch = () => {
    dispatch(changeDataSet());
  };

  const handleClear = () => {
    dispatch(clearData());
  };

  const handleSave = () => {
  };

  return (
    <>
      <ButtonBar onFetch={handleFetch} onClear={handleClear} onSave={handleSave} />
      <DataVisualization />
    </>
  );
};

describe('DataVisualization Integration', () => {
  const renderWithRedux = (
    component: React.ReactNode,
    { initialState = {} } = {}
  ) => {
    const store = configureStore({
      reducer: {
        data: dataReducer
      },
      preloadedState: {
        data: {
          headers: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7'],
          tableData: dataSets.set1,
          selectedRow: dataSets.set1[0],
          currentDataSet: 'set1',
          ...initialState
        }
      }
    });

    return {
      ...render(<Provider store={store}>{component}</Provider>),
      store
    };
  };

  it('should display table with initial data', () => {
    renderWithRedux(<TestComponent />);
    
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('x1')).toBeInTheDocument();
    expect(screen.getByText('x7')).toBeInTheDocument();

    expect(screen.getByText('abc')).toBeInTheDocument();
    const firstRow = screen.getByText('abc').closest('tr');
    expect(firstRow).toHaveTextContent('1');
  });

  it('should update chart when row is selected', () => {
    renderWithRedux(<TestComponent />);
    
    const row = screen.getByText('xyz').closest('tr');
    if (row) {
      fireEvent.click(row);
    }

    const selectedRow = screen.getByText('xyz').closest('tr');
    expect(selectedRow).toHaveClass('selectedRow');
    expect(selectedRow).toHaveTextContent('35');
  });

  it('should clear data when clear button is clicked', () => {
    const { store } = renderWithRedux(<TestComponent />);
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    const state = store.getState();
    expect(state.data.tableData).toHaveLength(0);
    expect(state.data.selectedRow).toBeNull();
    expect(state.data.headers).toHaveLength(0);

    expect(screen.queryByText('abc')).not.toBeInTheDocument();
    expect(screen.queryByText('x1')).not.toBeInTheDocument();
  });

  it('should change dataset when fetch button is clicked', () => {
    const { store } = renderWithRedux(<TestComponent />);
    
    const fetchButton = screen.getByRole('button', { name: /fetch/i });
    fireEvent.click(fetchButton);

    const state = store.getState();
    expect(state.data.currentDataSet).toBe('set2');
    expect(state.data.tableData).toEqual(dataSets.set2);

    expect(screen.getByText('row1')).toBeInTheDocument();
    const lastRow = screen.getByText('row4').closest('tr');
    expect(lastRow).toHaveTextContent('68');
  });

  it('should automatically select row with maximum value after dataset change', () => {
    const { store } = renderWithRedux(<TestComponent />);
    
    const fetchButton = screen.getByRole('button', { name: /fetch/i });
    fireEvent.click(fetchButton);

    const state = store.getState();
    const selectedRow = state.data.selectedRow;
    expect(selectedRow).toBeTruthy();
    
    if (selectedRow) {
      const maxValue = Math.max(...selectedRow.values);
      expect(maxValue).toBe(75);
    }
  });
}); 