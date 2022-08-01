import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import DriverResults from '../src/components/DriverResults';
import { BrowserRouter } from 'react-router-dom';
let documentBody: RenderResult;

describe('<DriverResult/>', () => {
    beforeEach(() => {
        documentBody = render(<DriverResults />, { wrapper: BrowserRouter });
    });

    test('shows Results', () => {
        expect(documentBody.getByText('Results')).toBeInTheDocument();
        expect(documentBody.getByText('Round')).toBeInTheDocument();
    })

    test('test getDriver Result', async () => {

        const effect = jest.spyOn(React, 'useEffect').mockImplementation((getDriverResultsData) => getDriverResultsData());
        render(<DriverResults />, { wrapper: BrowserRouter });

        expect(effect).toHaveBeenCalledTimes(1);
    });

})