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
      </div>

      {/* Facilities Section */}
      <div className="facilities">
        <h2>Our Classes and Facilities</h2>
        <div className="facility">
          <img src="./public/logos/water sports.svg" alt="Aqua Swimming" />
          <div>
            <h3>Aqua Swimming</h3>
            <p>
              Improve endurance and strength with low-impact water-based
              exercises. Perfect for all fitness levels.
            </p>
          </div>
        </div>
        <div className="facility">
          <img src="./public/logos/mind-body.svg" alt="Yoga" />
          <div>
            <h3>Yoga</h3>
            <p>
              Enhance flexibility, balance, and mindfulness with our yoga
              classes led by experienced instructors.
            </p>
          </div>
        </div>
        <div className="facility">
          <img src="./public/logos/clistanic-classes.svg" alt="Calisthenics" />
          <div>
            <h3>Calisthenics</h3>
            <p>
              Build functional strength and body control with bodyweight
              exercises.
            </p>
          </div>
        </div>
        <div className="facility">
          <img src="./public/logos/exercise-Cardio.svg" alt="Cardio" />
          <div>
            <h3>Cardio</h3>
            <p>
              Boost your heart health and burn calories with high-energy cardio
              workouts.
            </p>
          </div>
        </div>
        <div className="facility">
          <img src="./public/logos/boxing-glove.svg" alt="Combat Boxing" />
          <div>
            <h3>Combat Boxing & Martial Arts</h3>
            <p>
              Learn self-defense and improve agility, strength, and confidence
              with our combat classes.
            </p>
          </div>
        </div>
        <div className="facility">
          <img src="./public/logos/mobility-flex.svg" alt="Pilates" />
          <div>
            <h3>Mind & Core Pilates</h3>
            <p>
              Strengthen your core and improve posture with our pilates classes
              designed for all levels.
            </p>
          </div>
        </div>
        <div className="facility">
          <img src="./public/logos/moulding-svgrepo-com.svg" alt="Stretching" />
          <div>
            <h3>Mobility & Flexibility Stretching</h3>
            <p>
              Increase your range of motion and reduce the risk of injury with
              guided stretching sessions.
            </p>
          </div>
        </div>
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
