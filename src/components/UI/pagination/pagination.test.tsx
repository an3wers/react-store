/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import Pagintaion from "./Pagination";

// const mockOnPage = (p: number) => {
//   console.log(p);
// };

const mockProps = {
  currentPage: 1,
  pageCount: 10,
  onPage(p: number) {},
};

describe("Pagination", () => {
  beforeEach(() =>
    render(
      <Pagintaion
        current={mockProps.currentPage}
        pageCount={mockProps.pageCount}
        onPage={mockProps.onPage}
      />
    )
  );

  test("should be render in DOM", () => {
    const getPagination = screen.getByRole("navigation");
    expect(getPagination).toBeInTheDocument();
  });

  test("should be render all page buttons", () => {
    const getButtons = screen.getAllByRole("button");
    expect(getButtons.length).toBe(mockProps.pageCount + 2);
  });
});
