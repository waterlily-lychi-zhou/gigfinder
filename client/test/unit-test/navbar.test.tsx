import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../src/components/navbar/navbar";

describe("Navbar Component", () => {
  it("renders the logo correctly", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logo = screen.getByAltText("gigfinder-logo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/gigfinder-logo.png");
  });

  it("renders navigation links correctly", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const homeLink = screen.getByText("Home") as HTMLAnchorElement;
    const favouritesLink = screen.getByText("Favourites") as HTMLAnchorElement;
    expect(homeLink).toBeInTheDocument();
    expect(favouritesLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/events");
    expect(favouritesLink).toHaveAttribute("href", "/favourites");
  });
});
