import React from "react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="sideBarContent">
      <div className="sideBarContainer">
        <h2>Эксперты</h2>
        <div className="expert-card">
          <div className="expert-card-inner">
            <div className="expert-card-content">
              <img
                className="expert-img"
                src="https://studenthub.africa/app/uploads/careers/FV15qtL6Y7acgnuZLkj6T7STzdgkVs6q.jpg"
                alt=""
              />
              <p>Бермет Султангазиева</p>
            </div>
            <div>
              <p className="expert-phone">+996ххххххххх</p>
            </div>
          </div>
        </div>
        <div className="expert-card">
          <div className="expert-card-inner">
            <div className="expert-card-content">
              <img
                className="expert-img"
                src="https://i.guim.co.uk/img/media/fb4bb1a1d21c6224e702ab9f88278b422e5f7b1a/0_109_3319_1992/master/3319.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=544bb43bcb5840ef094f6ce516b7acaa"
                alt=""
              />
              <p>Роберт Полсон</p>
            </div>
            <div>
              <p className="expert-phone">+996ххххххххх</p>
            </div>
          </div>
        </div>
        <div className="expert-card">
          <div className="expert-card-inner">
            <div className="expert-card-content">
              <img
                className="expert-img"
                src="https://www.strath.ac.uk/media/1newwebsite/images-general/lawyer.jpg"
                alt=""
              />
              <p>Крутой челик</p>
            </div>
            <div>
              <p className="expert-phone">+996ххххххххх</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sideBarContainer">
        <h2 style={{ fontSize: "1.8rem" }}>Категории</h2>
        <NavLink className="sideCategoty">Экология</NavLink>
        <NavLink className="sideCategoty">Образование</NavLink>
        <NavLink className="sideCategoty">Здравоохранение</NavLink>
        <NavLink className="sideCategoty">Политические</NavLink>
        <NavLink className="sideCategoty">Социальные</NavLink>
        <NavLink className="sideCategoty">Технологические</NavLink>
        <NavLink className="sideCategoty">Экономические</NavLink>
      </div>
    </div>
  );
};

export default SideBar;
