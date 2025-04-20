import React from "react";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import "../../../src/App.css";
import "./UserHomePage.css";
import logo from "../../../public/Logos/dumbbell-svgrepo-com (1) 64px.svg";
import logo2 from "../../../public/Logos/water.svg";
import logo3 from "../../../public/Logos/waight-counter.svg";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="card">
        <div className="loader">
          <img src={logo} alt="" />
          <p>Train</p>
          <div className="words">
            <span className="word">smart</span>
            <span className="word">strong</span>
            <span className="word">unstoppable</span>
            <span className="word">limitless</span>
            <span className="word">determinded</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const Loader2 = () => {
  return (
    <div className="loader-wrapper">
      <div className="card">
        <div className="loader">
          <img src={logo2} alt="" />
          <p>Healthy</p>
          <div className="words">
            <span className="word">living</span>
            <span className="word">mindset</span>
            <span className="word">strength</span>
            <span className="word">power</span>
            <span className="word">energy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const Loader3 = () => {
  return (
    <div className="loader-wrapper">
      <div className="card">
        <div className="loader">
          <img src={logo3} alt="" />
          <p>Keep</p>
          <div className="words">
            <span className="word">moving</span>
            <span className="word">pushing</span>
            <span className="word">focused</span>
            <span className="word">evolving</span>
            <span className="word">inspiring</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function UserHomePage() {
  const { user } = useContext(authContext);

  return (
    <div className="user-homepage">
      <div className="welcome-section">
        <h1>Welcome to Brute Force, {user.username}!</h1>
        <p>
          Your fitness journey starts here. Explore our classes, personalized
          plans, and more to achieve your goals.
        </p>
        <Loader /> {/* Add the Loader component here */}
        <Loader2 /> {/* Add the Loader component here */}
        <Loader3 /> {/* Add the Loader component here */}
        <p>
          classes example
          <ul>1-sdsdsd</ul>
          <li>1-sdsdsd</li>
        </p>
      </div>
      <div className="gif-section">
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnR5bHd3ZXl1MjIxZDJxd3FmejJpZnJvNXB4cjkzY3JxNWNnNXkwdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bBjWB3mv9EuC3fVQKe/giphy.gif"
          alt="Fitness GIF"
        />
      </div>
    </div>
  );
}

export default UserHomePage;
