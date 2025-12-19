import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-daisy-charcoal text-daisy-cream">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link
              to="/"
              className="font-display text-3xl font-semibold tracking-tight"
            >
              Daisy<span className="text-primary">Verse</span>
            </Link>
            <p className="font-body text-daisy-cream/70 leading-relaxed">
              Where elegance blooms. Handcrafted jewelry inspired by nature's
              most delicate beauty.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-daisy-cream/70 hover:text-primary hover:bg-daisy-cream/10"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-daisy-cream/70 hover:text-primary hover:bg-daisy-cream/10"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-daisy-cream/70 hover:text-primary hover:bg-daisy-cream/10"
              >
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display text-lg font-semibold">Explore</h4>
            <ul className="space-y-3">
              {["Collections", "New Arrivals", "Bestsellers", "Gift Cards", "Sale"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="font-body text-daisy-cream/70 hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-6">
            <h4 className="font-display text-lg font-semibold">Help</h4>
            <ul className="space-y-3">
              {[
                "Shipping & Returns",
                "Care Guide",
                "Size Guide",
                "Contact Us",
                "FAQs",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="font-body text-daisy-cream/70 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-display text-lg font-semibold">Stay in Bloom</h4>
            <p className="font-body text-daisy-cream/70 text-sm">
              Join our garden and receive exclusive updates, early access, and
              special offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-daisy-cream/10 border-daisy-cream/20 text-daisy-cream placeholder:text-daisy-cream/40 focus:border-primary"
              />
              <Button variant="hero" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-daisy-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-daisy-cream/50">
            © 2024 Daisy Verse. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="#"
              className="font-body text-sm text-daisy-cream/50 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="font-body text-sm text-daisy-cream/50 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
