import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LogoMarquee } from "@/components/logo-marquee";
import { ALUMNI_LOGOS } from "@/lib/constants";

describe("LogoMarquee", () => {
  it("renders without crashing", () => {
    render(<LogoMarquee />);
    expect(screen.getByText("Built by alumni from")).toBeInTheDocument();
  });

  it("displays 'Built by alumni from' text", () => {
    render(<LogoMarquee />);
    expect(screen.getByText("Built by alumni from")).toBeInTheDocument();
  });

  it("renders all company logos with correct alt text", () => {
    render(<LogoMarquee />);
    for (const logo of ALUMNI_LOGOS) {
      const images = screen.getAllByAltText(logo.name);
      expect(images.length).toBeGreaterThan(0);
    }
  });

  it("has accessible aria-label on container", () => {
    render(<LogoMarquee />);
    expect(
      screen.getByLabelText(
        "Companies our team members previously worked at"
      )
    ).toBeInTheDocument();
  });

  it("each logo image has src pointing to correct path", () => {
    render(<LogoMarquee />);
    for (const logo of ALUMNI_LOGOS) {
      const images = screen.getAllByAltText(logo.name);
      expect(images[0]).toHaveAttribute("src", logo.logoPath);
    }
  });

  it("each logo has its configured height via inline style", () => {
    render(<LogoMarquee />);
    for (const logo of ALUMNI_LOGOS) {
      const images = screen.getAllByAltText(logo.name);
      expect(images[0]).toHaveStyle({ height: `${logo.height}px` });
    }
  });

  it("uses official American Express logo from CDN", () => {
    render(<LogoMarquee />);
    const amexImages = screen.getAllByAltText("American Express");
    expect(amexImages[0]).toHaveAttribute(
      "src",
      "https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/img-WEBLOGO1-01.jpg"
    );
  });
});
