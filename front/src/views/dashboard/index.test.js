import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import axiosMock from "axios";
import Dashboard from "./index";

afterEach(cleanup);

it("fetches and displays data",  () => {
  // We'll be explicit about what data Axios is to return when `get` is called.
  axiosMock.get.mockResolvedValueOnce({ status: 200 });

  // Let's render our Fetch component, passing it the url prop and destructuring
  // the `getByTestId` function so we can find individual elements.
  const url = `${process.env.REACT_APP_API_URL}/tickers/`;
  const { getByTestId } = render(<Dashboard />);
  const unresolvedSpan = waitForElement(() => getByTestId("loading"));
  // On first render, we expect the "loading" span to be displayed
  expect(unresolvedSpan.length).toBe(1);

  // // Because the useAxios call (useEffect) happens after initial render
  // // We need to handle the async nature of an AJAX call by waiting for the
  // // element to be rendered.
  // const resolvedSpan = await waitForElement(() => getByTestId("resolved"));

  // // Now with the resolvedSpan in hand, we can ensure it has the correct content
  // expect(resolvedSpan.length).toBe(1);
  // // Let's also make sure our Axios mock was called the way we expect
  // expect(axiosMock.get).toHaveBeenCalledTimes(1);
  // expect(axiosMock.get).toHaveBeenCalledWith(url);
});