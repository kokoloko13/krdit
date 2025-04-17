import { render, screen } from "@testing-library/react";
import Row from "./Row";
import { DebtRow } from "../../shared/types";

describe('Row', () => {
    let testRow: DebtRow
    
    beforeEach(() => {
        testRow = {
            Id: 1,
            Name: 'Test',
            NIP: '123456',
            Value: 789,
            Date: '2017-03-30T00:00:00'
        };

        render(
            <table>
                <tbody>
                    <Row debtRow={testRow} />
                </tbody>
            </table>
        );
    });

    it('should render Name field', () => {
        expect(screen.getByText(/Test/));
    });

    it('should render NIP field', () => {
        expect(screen.getByText(/123456/));
    });

    it('should render Value field', () => {
        expect(screen.getByText(/123/));
    });

    it('should render Date field', () => {
        expect(screen.getByText(/30-03-2017/));
    });
});