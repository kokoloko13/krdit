import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableContextProvider, useTableContext } from './TableContext';
import { getTopDebts, getFilteredDebts } from '../api/ApiService';

jest.mock('../api/ApiService', () => ({
  getTopDebts: jest.fn(),
  getFilteredDebts: jest.fn()
}));

const TestComponent = () => {
    const {
        isLoading,
        sortColumn,
        isSortAsc,
        setLoading,
        toggleColumnSort,
        toggleSortOrder,
        updateTopDebtRows,
        filterDebtRows,
      } = useTableContext();

  return (
    <div>
      <span>{isLoading ? 'Loading' : 'Table'}</span>
      <span>{sortColumn}</span>
      <span>{isSortAsc ? 'Asc' : 'Desc'}</span>

      <button onClick={() => setLoading(true)}>SetLoading</button>
      <button onClick={() => toggleColumnSort('TestValue')}>ToggleColumn</button>
      <button onClick={toggleSortOrder}>ToggleOrder</button>
      <button onClick={updateTopDebtRows}>GetTopDebts</button>
      <button onClick={() => filterDebtRows('Test')}>FilterDebts</button>
    </div>
  );
};

const renderContext = () => {
  return render(
    <TableContextProvider>
      <TestComponent />
    </TableContextProvider>
  );
};

describe('TableContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set initial values', () => {
    renderContext();

    expect(screen.getByText('Table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Asc')).toBeInTheDocument();
  });

  it('should set isLoading to true after setLoading call', async () => {
    renderContext();
    
    await act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'SetLoading' }));
    })

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should set sortColumn to TestValue and sortOrder to Asc after click', async () => {
    renderContext();

    await act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'ToggleColumn' }));
    })

    expect(screen.getByText('TestValue')).toBeInTheDocument();
    expect(screen.getByText('Asc')).toBeInTheDocument();
  });

  it('should set ortOrder to Desc after second click', async () => {
    renderContext();

    await act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'ToggleColumn' }));
    })

    expect(screen.getByText('TestValue')).toBeInTheDocument();
    expect(screen.getByText('Asc')).toBeInTheDocument();

    await act(() => {
        userEvent.click(screen.getByRole('button', { name: 'ToggleOrder' }));
    })

    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('should call getTopDebts when updateDebtRows', async () => {
    (getTopDebts as jest.Mock).mockResolvedValue([
      { Id: 1, Name: 'Jan Nowak', NIP: '1234567', Value: 1000, Date: '2024-01-01' },
    ]);

    renderContext();

    await act(async () => {
        await fireEvent.click(screen.getByRole('button', { name: 'GetTopDebts' }));
    })

    expect(getTopDebts).toHaveBeenCalled();
  });

  it('should call getFilteredDebts when filterDebtRows with Test param', async () => {
    (getFilteredDebts as jest.Mock).mockResolvedValue([
      { Id: 2, Name: 'Jan Nowak', NIP: '123456', Value: 2000, Date: '2024-02-01' },
    ]);

    renderContext();

    await act(async () => {
        await fireEvent.click(screen.getByRole('button', { name: 'FilterDebts' }));
    });

    expect(getFilteredDebts).toHaveBeenCalledWith('Test');
  });

});