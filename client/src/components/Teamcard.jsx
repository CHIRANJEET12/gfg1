import React, { useState, useEffect } from "react";
import "./Teamcard.css";
import getImageUrls from "../services/ImageService";

function CoreTeam() {
  const [scrolled, setScrolled] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await getImageUrls();
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching images:", error.message);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.pageYOffset;
      setScrolled(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const titles = [
    "Chair-person", "Co-chair", "Secretary", "Treasurer",
    "Member 1", "Member 2", "Member 3", "Member 4"
  ];

  const descriptions = [
    "Lorem ipsum dolor sit amet. Ab dolor ipsum ut quia tempora et iste corrupti qui obcaecati asperiores!",
    "Lorem ipsum dolor sit amet. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    "Lorem ipsum dolor sit amet. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Lorem ipsum dolor sit amet. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    "Lorem ipsum dolor sit amet. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
    "Lorem ipsum dolor sit amet. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.",
    "Lorem ipsum dolor sit amet. Nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex."
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % titles.length);
  };

  return (
    <div className="container">
      <div className={`upper-section ${scrolled ? "scrolled" : ""}`}>
        <h1 className="meet-text">MEET</h1>
        <p className="impressionable-text">
          our <br />
          <span>impressionable</span>
        </p>
        <h2 className="core-team">CORE TEAM</h2>
        <br />
        <i className="fa-regular fa-circle-down fa-5x"></i>
      </div>

      <div className={`below-section ${scrolled ? "visible" : ""}`}>
        <h1>CORE TEAM</h1>
        {[...Array(8)].map((_, index) => (
          <div
            className="card"
            key={index}
            onClick={index === currentCard ? nextCard : null}
            style={{
              display: index === currentCard ? "flex" : "none",
            }}
          >
            <div>
              <h2>{titles[currentCard]}</h2>
              <p>{descriptions[currentCard]}</p>
              <p className="username">gfg_kiit</p>
            </div>
            {imageUrls[currentCard] && (
              <img
                src={imageUrls[currentCard]}
                alt={`Team member ${currentCard + 1}`}
                className="team-member-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoreTeam;
