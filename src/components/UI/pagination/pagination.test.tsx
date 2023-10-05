/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import Pagintaion from "./Pagination";
import userEvent from "@testing-library/user-event";

const mockProps = {
  currentPage: 1,
  pageCount: 10,
};

const onPage = jest.fn();

describe("Pagination", () => {
  test("should be render in DOM", () => {
    render(
      <Pagintaion
        current={mockProps.currentPage}
        pageCount={mockProps.pageCount}
        onPage={onPage}
      />
    );

    const getPagination = screen.getByRole("navigation");

    expect(getPagination).toBeInTheDocument();
  });

  test("should be render all page buttons", () => {
    render(
      <Pagintaion
        current={mockProps.currentPage}
        pageCount={mockProps.pageCount}
        onPage={onPage}
      />
    );
    const getButtons = screen.getAllByRole("button");
    expect(getButtons.length).toBe(mockProps.pageCount + 2);
  });

  test("onPage should be called", () => {
    render(
      <Pagintaion
        current={mockProps.currentPage}
        pageCount={mockProps.pageCount}
        onPage={onPage}
      />
    );
    userEvent.click(screen.getByText("2"));
    expect(onPage).toHaveBeenCalled();
  });

  test("Pagination snapshot", () => {
    const view = render(
      <Pagintaion
        current={mockProps.currentPage}
        pageCount={mockProps.pageCount}
        onPage={onPage}
      />
    );

    expect(view).toMatchSnapshot();
  });
});
