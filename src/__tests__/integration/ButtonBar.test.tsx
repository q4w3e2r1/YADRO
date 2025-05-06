import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../../store/dataSlice';
import ButtonBar from '../../components/ButtonBar/ButtonBar.component';
import { exportToCSV } from '../../utils/csvExport';

jest.mock('../../utils/csvExport');

describe('ButtonBar Integration', () => {
  const mockExportToCSV = exportToCSV as jest.MockedFunction<typeof exportToCSV>;
  
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
          headers: ['x1', 'x2'],
          tableData: [
            { title: 'test', values: [1, 2] }
          ],
          selectedRow: null,
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

  beforeEach(() => {
    mockExportToCSV.mockClear();
  });

  it('should render all buttons', () => {
    renderWithRedux(<ButtonBar onFetch={() => {}} onClear={() => {}} onSave={() => {}} />);
    
    expect(screen.getByText('fetch')).toBeInTheDocument();
    expect(screen.getByText('clear')).toBeInTheDocument();
    expect(screen.getByText('save')).toBeInTheDocument();
  });

  it('should handle save button click with data', () => {
    const { store } = renderWithRedux(<ButtonBar 
      onFetch={() => {}} 
      onClear={() => {}} 
      onSave={() => {
        const state = store.getState();
        exportToCSV(state.data.headers, state.data.tableData);
      }} 
    />);

    const saveButton = screen.getByText('save');
    fireEvent.click(saveButton);

    expect(mockExportToCSV).toHaveBeenCalledWith(
      ['x1', 'x2'],
      [{ title: 'test', values: [1, 2] }]
    );
  });

  it('should handle save button click without data', () => {
    const { store } = renderWithRedux(
      <ButtonBar 
        onFetch={() => {}} 
        onClear={() => {}} 
        onSave={() => {
          const state = store.getState();
          if (state.data.tableData.length > 0) {
            exportToCSV(state.data.headers, state.data.tableData);
          }
        }} 
      />,
      {
        initialState: {
          headers: [],
          tableData: [],
          selectedRow: null
        }
      }
    );

    const saveButton = screen.getByText('save');
    fireEvent.click(saveButton);

    expect(mockExportToCSV).not.toHaveBeenCalled();
  });

  it('should handle fetch and clear button interactions', () => {
    const mockFetch = jest.fn();
    const mockClear = jest.fn();

    renderWithRedux(
      <ButtonBar 
        onFetch={mockFetch} 
        onClear={mockClear} 
        onSave={() => {}} 
      />
    );

    const fetchButton = screen.getByText('fetch');
    const clearButton = screen.getByText('clear');

    fireEvent.click(fetchButton);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    fireEvent.click(clearButton);
    expect(mockClear).toHaveBeenCalledTimes(1);
  });
}); 