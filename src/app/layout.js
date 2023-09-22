"use client";

import Header from "../../components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux"; // Import Provider
import store from "../../lib/store";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [showImage, setShowImage] = useState(false);

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <html lang="en">
      <Provider store={store}>
        <body
          className={
            showImage ? `${inter.className} greyscale` : inter.className
          }
        >
          <Header />
          {children}
          <button className="rules" onClick={toggleImage}>
            RULES
          </button>
          {showImage && (
            <div className="image-overlay" onClick={toggleImage}>
              <div className="white-back">
                <div className="head">
                  <p>RULES</p>
                  <Image
                    src="icon-close.svg"
                    width="20"
                    height="20"
                    alt="close"
                  />
                </div>
                <Image
                  src="image-rules.svg"
                  alt="Rules"
                  width="304"
                  height="270"
                  priority
                />
              </div>
            </div>
          )}
        </body>
      </Provider>
    </html>
  );
}

const handleResize = () => {
  const windowWidth = window.innerWidth;

  // Define the width threshold below which you want to go fullscreen
  const thresholdWidth = 450; // Adjust this value as needed

  if (windowWidth <= thresholdWidth) {
    // Check if the document is not already in fullscreen
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      // Request fullscreen mode
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    }
  } else {
    // Check if the document is in fullscreen
    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }
};
