import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "@/components/footer";
import { COMPANY } from "@/lib/constants";

describe("Footer", () => {
  it("renders the company name", () => {
    render(<Footer />);
    expect(
      screen.getByRole("heading", { level: 2, name: COMPANY.name })
    ).toBeInTheDocument();
  });

  it("displays the contact email", () => {
    render(<Footer />);
    expect(screen.getByText(COMPANY.contactEmail)).toHaveAttribute(
      "href",
      `mailto:${COMPANY.contactEmail}`
    );
  });

  it("has the contact section id", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });
});
