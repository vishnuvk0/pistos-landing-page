import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from "@/components/navbar";
import { COMPANY } from "@/lib/constants";

describe("Navbar", () => {
  it("renders the company name", () => {
    render(<Navbar />);
    expect(screen.getByText(COMPANY.name)).toBeInTheDocument();
  });

  it("renders Login link with href /login", () => {
    render(<Navbar />);
    const loginLink = screen.getByRole("link", { name: "Login" });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("renders Contact link with href #contact", () => {
    render(<Navbar />);
    const contactLink = screen.getByRole("link", { name: "Contact" });
    expect(contactLink).toHaveAttribute("href", "#contact");
  });

  it("does not render Problem link", () => {
    render(<Navbar />);
    expect(screen.queryByRole("link", { name: "Problem" })).not.toBeInTheDocument();
  });

  it("does not render Solution link", () => {
    render(<Navbar />);
    expect(screen.queryByRole("link", { name: "Solution" })).not.toBeInTheDocument();
  });
});
