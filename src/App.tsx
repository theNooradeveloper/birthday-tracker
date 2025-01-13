import "./styles.css";
import dataObj from "./data";
import { useState } from "react";
export default function App() {
  return (
    <>
      <Tracker />
    </>
  );
}

function calculateAge(dob) {
  const currentDate = new Date();
  const birthDate = new Date(dob);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  const dayDiff = currentDate.getDate() - birthDate.getDate();

  // Adjust age if the birthday has not yet occurred this year
  //monthDiff < 0 ( the birth month hasn't been occured in the present year so age--)
  //monthDiff === 0 ( the same month so calc day diff)
  // dayDiff < 0 ( bday hasn't been occured so age--)
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
}

function Tracker() {
  const [filter, setFilter] = useState("all");
  function filterResult() {
    const todayDate = new Date();
    const todayMonth = todayDate.getMonth();
    const todayDay = todayDate.getDate();
    if (filter === "all") return dataObj;
    if (filter === "upcoming") {
      return dataObj.filter((data) => {
        const dob = new Date(data.dob);
        const dobMonth = dob.getMonth();
        const dobDay = dob.getDate();
        return (
          dobMonth > todayMonth ||
          (dobMonth === todayMonth && dobDay > todayDay)
        );
      });
    }
    if (filter === "past") {
      return dataObj.filter((data) => {
        const dob = new Date(data.dob);
        const dobMonth = dob.getMonth();
        const dobDay = dob.getDate();
        return (
          dobMonth < todayMonth ||
          (dobMonth === todayMonth && dobDay < todayDay)
        );
      });
    }
    if (filter === "today") {
      return dataObj.filter((data) => {
        const dob = new Date(data.dob);
        const dobMonth = dob.getMonth();
        const dobDay = dob.getDate();
        return dobMonth === todayMonth && dobDay === todayDay;
      });
    }
  }
  let filteredResult = filterResult();
  return (
    <>
      <h1>birthday tracker</h1>
      <section className="container">
        <main>
          {filteredResult.map((data) => {
            const age = calculateAge(data.dob);
            return (
              <article key={data.name}>
                <figure>
                  <img src={data.profileImg} />
                </figure>
                <div className="details">
                  <h2>{data.name}</h2>
                  <p>{age} Years old</p>
                </div>
              </article>
            );
          })}
        </main>
        <aside>
          <button onClick={() => setFilter("past")}>Past Birthday</button>
          <button onClick={() => setFilter("today")}>Birthday Today</button>
          <button onClick={() => setFilter("upcoming")}>
            Upcoming Birthday
          </button>
          <button onClick={() => setFilter("all")}>All Birthday</button>
        </aside>
      </section>
    </>
  );
}
