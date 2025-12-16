# AniBlock 3D

A modern, interactive web application showcasing anime-inspired 3D graphics and web3 integration.

## Features

- **3D Hero Section**: Eye-catching 3D animations and visual effects
- **Anime Carousel**: Dynamic carousel for browsing anime content
- **Pricing Section**: Clear pricing tiers for various subscription levels
- **Responsive Design**: Fully responsive design that works on all devices
- **Web3 Integration**: Connected Web3 provider for blockchain functionality
- **Modern UI**: Tailwind CSS for beautiful, utility-first styling

## Tech Stack

- **Frontend Framework**: React + JSX
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Post-processing**: PostCSS
- **Package Manager**: npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/shryexe/aniblock-3D.git
cd aniblock-3D
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Usage

The main entry point is `src/main.jsx`, which renders the `App` component. The application includes:

- **Hero3DImage**: 3D animated hero section
- **AnimeCarousel**: Carousel component for anime content display
- **FeaturesSection**: Highlights key features
- **PricingSection**: Displays pricing options
- **Footer**: Application footer
- **AnimatedBackground**: Background animation effects

## Project Structure

```
aniblock-3D/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero3DImage.jsx
│   │   └── PricingSection.jsx
│   ├── App.jsx
│   ├── AnimeCarousel.jsx
│   ├── Web3Provider.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Web3 Integration

The application includes Web3 provider support for blockchain interactions. See `Web3Provider.jsx` for configuration details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

---

Built with ❤️ by the AniBlock 3D team
