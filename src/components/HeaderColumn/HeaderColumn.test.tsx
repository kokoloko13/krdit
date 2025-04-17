import { fireEvent, render, screen } from "@testing-library/react";
import HeaderColumn from "./HeaderColumn";
import { useTableContext } from "../../context/TableContext";

jest.mock("../../context/TableContext", () => ({
    useTableContext: jest.fn(),
}));

describe('HeaderColumn', () => {
    let tableContextMock;

    describe('ASC', () => {
        beforeEach(() => {
            tableContextMock = (useTableContext as jest.Mock).mockReturnValue({
                toggleColumnSort: jest.fn(),
                sortColumn: "Name",
                isSortAsc: true,
            });

            render(
                <table>
                    <thead>
                        <tr>
                            <HeaderColumn name="Name" title="Test" />
                        </tr>
                    </thead>
                </table>
            );
        });

        it('should render column header label', () => {
            expect(screen.getByText(/Test/)).toBeInTheDocument();
        });
        
        it('should render column header label with asc sorting order icon', () => {
            const element = screen.getByText(/Test/);
            expect(screen.getByText(/▲/));
        });

        it('should call toggleColumnSort when click on column header ', () => {
            const { toggleColumnSort } = useTableContext(); 

            const element = screen.getByText(/Test/);
            fireEvent.click(element);

            expect(toggleColumnSort).toHaveBeenCalledWith('Name');
        });
    });

    describe('DESC', () => {
        beforeEach(() => {
            tableContextMock = (useTableContext as jest.Mock).mockReturnValue({
                toggleColumnSort: jest.fn(),
                sortColumn: "Name",
                isSortAsc: false,
            });

            render(
                <table>
                    <thead>
                        <tr>
                            <HeaderColumn name="Name" title="Test" />
                        </tr>
                    </thead>
                </table>
            );
        });

        it('should render column header label with desc sorting order icon', () => {
            expect(screen.getByText(/▼/));
        });
    })
});