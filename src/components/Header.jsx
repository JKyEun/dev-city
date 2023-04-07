import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/_header.scss";

export default function Header() {
  const [location, setLocation] = useState("데브시티");
  return (
    <header>
      <div className="minMax">
        <div className="flexBox-between top">
          <div className="flexBox">
            <h1>
              <img src="" alt="logo" />
            </h1>
            <div className="search">
              <input type="text" placeholder="스터디 / 챌린지를 검색해주세요" />
            </div>
          </div>
          <div className="flexBox">
            <div className="icon-box flexBox-between">
              <Link to={"/mycity/interest"}>
                <img src="/images/icon_interest.svg" alt="" />
              </Link>
              <Link to={"/"}>
                <img src="/images/icon_bell.svg" alt="" />
              </Link>
              <Link to={"/mycity/todo"}>
                <img src="/images/icon_date.svg" alt="" />
              </Link>
            </div>
            <div className="profile">
              <Link to={"/mycity"}>
                <img src="" alt="profile" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flexBox-between bottom">
          <ul className="flexBox-between navigation">
            <li>
              <Link to={"/mycity"}>나의 도시</Link>
            </li>
            <li>
              <Link to={"/study"}>스터디</Link>
            </li>
            <li>
              <Link to={"/faq"}>FAQ</Link>
            </li>
          </ul>

          <Link to={"/"}>스터디 생성하기</Link>
        </div>
      </div>
      <div className="location">
        <div className="minMax">
          <Link to={"/"}>
            <img src="/images/icon_home.svg" alt="home" />
          </Link>
          <p>{location}</p>
          <p>{location}</p>
        </div>
      </div>
    </header>
  );
}
