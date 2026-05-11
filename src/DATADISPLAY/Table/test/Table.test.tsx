import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from '../Table';
import type { TableColumn } from '../Table.types';

interface TestRow {
  id: string;
  name: string;
  age: number;
  [key: string]: unknown;
}

const testData: TestRow[] = [
  { id: '1', name: 'Alice', age: 30 },
  { id: '2', name: 'Bob', age: 25 },
  { id: '3', name: 'Charlie', age: 35 },
];

const testColumns: TableColumn<TestRow>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
];

describe('Table', () => {
  it('renders with container class', () => {
    const { container } = render(
      <Table data={testData} columns={testColumns} enablePagination={false} enableFiltering={false} />,
    );
    expect(container.querySelector('.w3f-table-container')).toBeInTheDocument();
  });

  it('has displayName set', () => {
    expect((Table as React.FC).displayName).toBe('Table');
  });

  it('renders table element with base class', () => {
    const { container } = render(
      <Table data={testData} columns={testColumns} enablePagination={false} enableFiltering={false} />,
    );
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass('w3f-table');
  });

  it('renders column headers', () => {
    render(
      <Table data={testData} columns={testColumns} enablePagination={false} enableFiltering={false} />,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(
      <Table data={testData} columns={testColumns} enablePagination={false} enableFiltering={false} />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('shows empty message when data is empty', () => {
    render(
      <Table data={[]} columns={testColumns} enablePagination={false} enableFiltering={false} />,
    );
    expect(screen.getByText('No se encontraron resultados')).toBeInTheDocument();
  });

  it('applies striped variant class', () => {
    const { container } = render(
      <Table data={testData} columns={testColumns} variant="striped" enablePagination={false} enableFiltering={false} />,
    );
    expect(container.querySelector('table')).toHaveClass('w3f-table-striped');
  });

  it('applies bordered variant class', () => {
    const { container } = render(
      <Table data={testData} columns={testColumns} variant="bordered" enablePagination={false} enableFiltering={false} />,
    );
    expect(container.querySelector('table')).toHaveClass('w3f-table-bordered');
  });

  it('applies size class', () => {
    const { container } = render(
      <Table data={testData} columns={testColumns} size="sm" enablePagination={false} enableFiltering={false} />,
    );
    expect(container.querySelector('table')).toHaveClass('w3f-table-sm');
  });

  it('applies color class', () => {
    const { container } = render(
      <Table data={testData} columns={testColumns} color="primary" enablePagination={false} enableFiltering={false} />,
    );
    expect(container.querySelector('table')).toHaveClass('w3f-table-color-primary');
  });

  it('renders filter input when enableFiltering=true', () => {
    render(
      <Table data={testData} columns={testColumns} enableFiltering enablePagination={false} />,
    );
    expect(screen.getByLabelText('Filtrar tabla')).toBeInTheDocument();
  });

  it('renders pagination when enablePagination=true', () => {
    const { container } = render(
      <Table data={testData} columns={testColumns} enablePagination enableFiltering={false} />,
    );
    expect(container.querySelector('.w3f-table-pagination')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Table data={testData} columns={testColumns} className="my-table" enablePagination={false} enableFiltering={false} />,
    );
    expect(container.firstElementChild).toHaveClass('my-table');
  });
});
