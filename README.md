# Ingress Portal Linker

A web-based tool for Ingress players to plan optimal portal linking strategies by calculating non-intersecting links between portals.

## What is this?

Ingress Portal Linker helps players of the augmented reality game [Ingress](https://www.ingress.com/) plan complex linking operations. In Ingress, players create links between portals to form control fields, but links cannot cross each other. This tool:

- **Calculates optimal linking patterns** - Automatically determines which portals can be linked without intersections
- **Visualizes portal networks** - Interactive D3-powered visualization shows your portal layout and planned links
- **Plans key requirements** - Displays how many keys are needed for each portal
- **Supports anchor strategies** - Choose anchor portals from different directions (North, South, East, West) and starting orientations

## Features

- **Anchor Portal Selection**: Choose which portal to use as your anchor based on cardinal directions
- **Primary Direction Control**: Set the starting direction for your linking strategy
- **Portal Data Import**: Paste portal data including coordinates, titles, and Intel links
- **Interactive Visualization**: See your portals and links rendered in real-time with D3.js
- **Link Planning Tree**: View a hierarchical tree of planned links with key counts
- **Non-intersection Algorithm**: Automatically ensures no planned links cross each other

## Usage

1. **Select Anchor Portal**: Choose the direction (North, South, East, West) for your anchor portal
2. **Set Primary Direction**: Choose where to start linking from
3. **Add Portal Data**: Input your portal information (coordinates, names, links)
4. **Review Results**: See the calculated linking order and key requirements
5. **Follow the Plan**: Use the tree view to execute your linking strategy in-game

## Technology Stack

- **React** with TypeScript
- **D3.js** for data visualization
- **Ant Design** for UI components
- **D3-Delaunay** for geometric calculations
- Built with Create React App

## Development

### Available Scripts

#### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload when you make edits.

#### `npm test`

Launches the test runner in interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder. The build is optimized and minified.

### Deployment

The project is configured for Firebase Hosting. Run `npm run build` followed by `firebase deploy` to deploy.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
