import { render, asFragment } from "@testing-library/react";
import Card from "./Card";

it("renders", function() {
    render(<Card />);
})

it("matches the snapshot", function(){
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
})