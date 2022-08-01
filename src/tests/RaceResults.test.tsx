import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import RaceResults from '../components/RaceResults';
import { BrowserRouter } from 'react-router-dom';

let documentBody: RenderResult;

describe('<DriverResult/>', () => {
    beforeEach(() => {
        documentBody = render(<RaceResults />, { wrapper: BrowserRouter });
    });

    test('shows Results', () => {
        expect(documentBody.getByText('Driver Number')).toBeInTheDocument();
        expect(documentBody.getByText('Average Speed')).toBeInTheDocument();
    });

    test('test getDriver Result', async () => {

        const effect = jest.spyOn(React, 'useEffect').mockImplementation((getDriverResultsData) => getDriverResultsData());
        render(<RaceResults />, { wrapper: BrowserRouter });

        expect(effect).toHaveBeenCalledTimes(1);
    });

})