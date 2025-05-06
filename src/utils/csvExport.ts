import { TableRow } from '../types/data';

export const exportToCSV = (headers: string[], data: TableRow[]): void => {
  const csvHeaders = ['title', ...headers].join(',');
  
  const csvRows = data.map(row => {
    return [row.title, ...row.values].join(',');
  });
  
  const csvContent = [csvHeaders, ...csvRows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'table_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}; 