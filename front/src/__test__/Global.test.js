import { render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import DefaultLayout from '../layouts/DefaultLayout';
import {MemoryRouter} from "react-router-dom";


describe('Comprobar el render de los componentes', ()=>{
    test('<DefaultLayout/>', () => {
        const { getByTestId } = render(
        <MemoryRouter>
            <DefaultLayout/>
        </MemoryRouter>);
        expect(getByTestId("layout")).toBeDefined();
    });
})






