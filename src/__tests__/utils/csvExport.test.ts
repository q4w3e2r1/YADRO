import { exportToCSV } from '../../utils/csvExport';

describe('CSV Export Utility', () => {
  let mockCreateObjectURL: jest.Mock;
  let mockCreateElement: jest.Mock;
  let mockLink: any;

  beforeEach(() => {
    mockLink = {
      setAttribute: jest.fn(),
      click: jest.fn(),
      style: {},
      download: 'test.csv'
    };

    mockCreateElement = jest.fn().mockReturnValue(mockLink);
    document.createElement = mockCreateElement;
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();

    mockCreateObjectURL = jest.fn().mockReturnValue('mock-blob-url');
    URL.createObjectURL = mockCreateObjectURL;
    URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create and trigger download of CSV file', () => {
    const headers = ['x1', 'x2'];
    const data = [
      { title: 'row1', values: [1, 2] },
      { title: 'row2', values: [3, 4] }
    ];

    exportToCSV(headers, data);

    expect(mockCreateElement).toHaveBeenCalledWith('a');

    expect(mockCreateObjectURL).toHaveBeenCalled();
    const blob = mockCreateObjectURL.mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/csv;charset=utf-8;');

    expect(mockLink.setAttribute).toHaveBeenCalledWith('href', 'mock-blob-url');
    expect(mockLink.setAttribute).toHaveBeenCalledWith('download', 'table_data.csv');
    expect(mockLink.style.visibility).toBe('hidden');

    expect(mockLink.click).toHaveBeenCalled();
    expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);
    expect(document.body.removeChild).toHaveBeenCalledWith(mockLink);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-blob-url');
  });
}); 