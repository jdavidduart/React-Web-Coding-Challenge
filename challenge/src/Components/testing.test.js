import React from 'react';
import {screen, render} from '@testing-library/react';
import Home from './Home/Home';
import userEvent from '@testing-library/user-event';

beforeEach(() =>  render(<Home/>));

describe('Home', ()=>{
    it('must display a title', () => {
        expect(screen.queryByText(/POLICE DEPARTAMENT OF BERLIN/i)).toBeInTheDocument();
    })
    it('must display a input', () => {
        const inputSearch = screen.getByTestId("searchInput");
        expect(inputSearch).toBeInTheDocument();
    })
    it('must save the input value', () => {
        const inputSearch = screen.getByTestId("searchInput");
        userEvent.type(inputSearch, "new text");
        expect(screen.getByTestId("searchInput")).toHaveValue("new text");
        
    })

    it('resest input search when click on reset btn', () => {
        const inputSearch = screen.getByTestId("searchInput");
        const resetBtn = screen.getByTestId("resetBtn");
        userEvent.type(inputSearch, "new text");
        userEvent.click(resetBtn)
        expect(screen.getByTestId("searchInput")).toHaveValue("");
        
    })
})

