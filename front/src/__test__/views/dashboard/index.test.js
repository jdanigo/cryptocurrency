import React from 'react';
import Dashboard from '../../../views/dashboard/index';
import { render, cleanup, waitFor } from '@testing-library/react';
import axiosMock from 'axios';

afterEach(cleanup);

it('Comprobar el render del dashboard con llamado al api', async () => {
    axiosMock.get.mockResolvedValueOnce({ data:{ data: []}, status:200 });
    const url = (`${process.env.REACT_APP_API_URL}/tickers/`);
    const { getByTestId } = render(<Dashboard/>);
    expect(getByTestId("loading")).toBeDefined();
    const resolvedSpan = await waitFor(() => getByTestId("resolved"));
    expect(resolvedSpan).toBeDefined();
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
});