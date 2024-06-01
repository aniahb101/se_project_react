import "./SideBar.css";
import avatar from "../../images/headericon.png";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Alisha Tegegne" />
      <p className="sidebar__username">Alisha Tegegne</p>
    </div>
  );
};

export default SideBar;
