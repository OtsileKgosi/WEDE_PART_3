# Astro's African Foodies

A multi-page static website for **Astro's African Foodies**, a home-cooking food business serving a different traditional South African dish every day of the week. Customers can browse the weekly menu, build an order, learn about the services on offer, create an account, and get in touch.

Built with plain **HTML, CSS and vanilla JavaScript**. There is no build step, framework or backend.

---

## Pages

| Page | File | Purpose |
|------|------|---------|
| Homepage | `homepage.html` | Hero banner, "This week's plate" strip, reasons to choose us, sign-up call to action |
| About Us | `aboutus.html` | The story behind the business |
| Munchies | `munchies.html` | Weekly menu (Monday to Sunday) with prices, order builder and customer reviews |
| Services | `service.html` | Delivery, rotating menu, catering, pre-order and pickup, plus a "How It Works" guide |
| Contact | `contact.html` | Contact form with validation |
| Login | `login.html` | Login form with validation |
| Sign Up | `signup.html` | Registration form with validation |

Start at **`homepage.html`**.

## The weekly menu

| Day | Dish | Price |
|-----|------|-------|
| Monday | Mogodu | R130 |
| Tuesday | Skopo | R80 |
| Wednesday | Dombolo | R145 |
| Thursday | Maotwana | R100 |
| Friday | Bunny Chow | R120 |
| Saturday | Chesa Nyama | R130 |
| Sunday | 7even Colours | R170 |

## Features

All behaviour lives in `script.js`.

- **Today's special:** the card matching the current day is highlighted with a "Today's special" badge on the Homepage and Munchies pages.
- **Order builder (Munchies):** "Add to order" buttons on each dish feed a sticky order bar with quantity controls (+ / −), a running total in Rand, Clear, and Place order.
- **Image lightbox (Munchies):** click a dish photo to enlarge it; click anywhere or press `Esc` to close.
- **Form validation (Contact, Login, Sign Up):** inline error messages on blur and input, with these rules:
  - Name: at least 2 characters
  - Email: must be a valid address
  - Password: at least 8 characters on sign up
  - Confirm password: must match
  - Message: at least 10 characters
- **Show/hide password** toggle on password fields.
- **Mobile menu:** a hamburger toggle appears on small screens.
- **Simulated flows:** a successful sign-up redirects to the login page, and a successful login redirects to the Munchies page.

> **Note:** this is a front-end prototype. Forms do not send data anywhere, there is no real authentication, and "Place order" only shows a confirmation alert. Connecting a backend would be needed for real accounts and orders.

## Project structure

```
site/
├── homepage.html
├── aboutus.html
├── munchies.html
├── service.html
├── contact.html
├── login.html
├── signup.html
├── styles.css                      # All styling (design tokens in :root)
├── script.js                       # All interactivity
├── astros_african_foodies_logo.svg
├── README.md
└── images/                         # Dish photos and logo
```

## Running the site

**Quickest:** open `homepage.html` in any modern browser.

**Local server (optional):**

```bash
# from inside the site folder
python3 -m http.server 8000
# then visit http://localhost:8000/homepage.html
```

An internet connection is needed for the Google Fonts (**Playfair Display** and **Poppins**). Without it, the browser falls back to default fonts and everything else still works.

## Design

- Dark theme with gold accents on a forest-green hero
- Colours and spacing are defined as CSS variables at the top of `styles.css` (`--gold`, `--forest`, `--bg-dark`, and so on), so the look is easy to retheme
- Responsive layout with a collapsible mobile navigation

## Customising

- **Change menu items or prices:** edit the cards in `munchies.html`. The order builder reads each dish name and its `.price-tag` automatically.
- **Change colours:** edit the variables in `:root` in `styles.css`.
- **Add a page:** copy an existing page, update the nav links in every page, and keep the `<script src="script.js" defer>` tag.

## Browser support

Any current version of Chrome, Edge, Firefox or Safari.
