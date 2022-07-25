<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Midcrash/next-square-dashboard">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Square Dashboard</h3>

  <p align="center">
    A dashboard app to display all sales for users with multiple square accounts
    <br />
    <a href="https://github.com/Midcrash/next-square-dashboard"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Midcrash/next-square-dashboard">View Demo</a>
    ·
    <a href="https://github.com/Midcrash/next-square-dashboard/issues">Report Bug</a>
    ·
    <a href="https://github.com/Midcrash/next-square-dashboard/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://imgur.com/ilH0i2p)

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Square](https://developer.squareup.com/us/en)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Firebase account and Square Developer account

- [Firebase](https://firebase.google.com/)
- [Square](https://developer.squareup.com/us/en)

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Midcrash/next-square-dashboard.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Setting up local variables

1. Create an account for Firebase
   1. Create a new project
   2. Add a web app
   3. Go into project settings and copy the firebaseConfig
2. Create a Square account
   1. Go to developer dashboard
   2. Create a new application and open
   3. Go into OAuth and go into sandbox mode
   4. Change Sandbox Redirect URL to http://localhost:3000/callback
   5. Copy Sandox Application ID and Sandbox Application secret
3. Create an .env file at root and copy and paste your variables
   ```js
   # Firebase Config variables
   NEXT_PUBLIC_FIREBASE_API_KEY=(YOUR VARIABLE)
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=(YOUR VARIABLE)
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=(YOUR VARIABLE)
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=(YOUR VARIABLE)
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=(YOUR VARIABLE)
   NEXT_PUBLIC_FIREBASE_APP_ID=(YOUR VARIABLE)
   # Square variables
   NEXT_PUBLIC_SQ_ENVIRONMENT=sandbox
   NEXT_PUBLIC_SQ_APPLICATION_ID=(YOUR VARIABLE)
   NEXT_PUBLIC_SQ_APPLICATION_SECRET=(YOUR VARIABLE)
   ```
4. Run dev server
   ```sh
   npm run dev
   ```
   <p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
  - [ ] Nested Feature

See the [open issues](https://github.com/Midcrash/next-square-dashboard/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Tyrae Yao - [@Tyao25567946](https://twitter.com/Tyao25567946) - yaotyrae@gmail.com

Project Link: [https://github.com/Midcrash/next-square-dashboard](https://github.com/Midcrash/next-square-dashboard)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Midcrash/next-square-dashboard.svg?style=for-the-badge
[contributors-url]: https://github.com/Midcrash/next-square-dashboard/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Midcrash/next-square-dashboard.svg?style=for-the-badge
[forks-url]: https://github.com/Midcrash/next-square-dashboard/network/members
[stars-shield]: https://img.shields.io/github/stars/Midcrash/next-square-dashboard.svg?style=for-the-badge
[stars-url]: https://github.com/Midcrash/next-square-dashboard/stargazers
[issues-shield]: https://img.shields.io/github/issues/Midcrash/next-square-dashboard.svg?style=for-the-badge
[issues-url]: https://github.com/Midcrash/next-square-dashboard/issues
[license-shield]: https://img.shields.io/github/license/Midcrash/next-square-dashboard.svg?style=for-the-badge
[license-url]: https://github.com/Midcrash/next-square-dashboard/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/tyrae-yao-08b684154
[product-screenshot]: images/screenshot.png
