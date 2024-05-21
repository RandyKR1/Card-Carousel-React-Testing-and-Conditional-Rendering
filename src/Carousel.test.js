import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders", function() {
    render(<Carousel />);
})

it("matches the snapshot", function(){
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});




/* Test for right arrow funtionality */
it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});



/* Test for left arrow functionality */
it('works when you click on the left arrow', function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
      />  
  );

    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow)

    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();

    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow)

    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
})


/* Test checking for left arrow when on first image */
it('hides the left arrow when on first image', function(){
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
      />  
  );

  //checking for images and arrows
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('.bi-arrow-right-circle')
  ).toBeInTheDocument();
})


/* Test checking for right arrow when on last image */
it('hides the right arrow when on last image', function(){
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
      />  
  );

  //looping over images until we hit the last image
  const rightArrow = container.querySelector('.bi-arrow-right-circle')
  for(let i=0; i<TEST_IMAGES.length - 1; i++){
    fireEvent.click(rightArrow);
  }

  //checking for arrows
  expect(
    container.querySelector('.bi-arrow-right-circle')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).toBeInTheDocument();
});