import { NavLink } from "react-router-dom";

const Navbar = () => {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  const isDawn = hour >= 18 && hour < 20;
  const isNight = (hour >= 20 || hour < 6); 

  // Determine text color based on time of day
  const getTextColor = () => {
    switch (true) {
      case isDay:
        return "text-black";
      case isDawn:
        return "text-black";
      case isNight:
        return "text-blue-500";
      default:
        return "text-black";
    }
  };

  const getActiveTextColor = () => {
    switch (true) {
      case isDay:
        return "text-blue-500";
      case isDawn:
        return "text-blue-500";
      case isNight:
        return "text-blue-black";
      default:
        return "text-blue-500";
    }
  };

  const regularTextColor = getTextColor();
  const activeTextColor = getActiveTextColor();

  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text">VD</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive ? activeTextColor : regularTextColor
          }
        >
          About
        </NavLink>
        <NavLink
          to="projects"
          className={({ isActive }) =>
            isActive ? activeTextColor : regularTextColor
          }
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;