import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [city, setCity] = useState([]);
  //console.log("city:", city);
  const navigate = useNavigate();
  const [totalpage, setTotalPage] = useState(1);

  const [currentpage, setCurrentPage] = useState(1);

  const [polling, setPolling] = useState("");

  const totalarr = Array.from({ length: totalpage }, (_, i) => i + 1);

  const search = useLocation().search;

  const page = new URLSearchParams(search).get("page") || currentpage;
  const pollingstations = new URLSearchParams(search).get("pollingstations");

  //getData function
  async function getData() {
    if (pollingstations && page) {
      let res = await fetch(
        `http://localhost:2100/city?pollingstations=${pollingstations}&page=${page}`
      );
      let data = await res.json();
      setCity(data.citysort);
      setTotalPage(data.totalpages);
    } else {
      let res = await fetch(`http://localhost:2100/city?page=${page}`);
      let data = await res.json();

      setCity(data.city);
      setTotalPage(data.totalpages);
    }
  }

  const changePage = async (page) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setCurrentPage(page);
    if (params.pollingstations !== undefined) {
      navigate(`?page=${page}&pollingstations=${params.pollingstations}`);
    } else {
      navigate(`?page=${page}`);
    }

    setCurrentPage(page);
  };

  const redirectpage = (id) => {
    navigate(`/${id}`);
  };

  const filter = (poll) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    setPolling(poll);
    console.log("params:", params);
    if (params.pollingstations !== undefined) {
      navigate(`?pollingstations=${poll}`);
    } else if (params.page !== undefined) {
      navigate(`?page=${params.page}&pollingstations=${poll}`);
    } else {
      navigate(`?pollingstations=${poll}`);
    }
  };

  useEffect(() => {
    getData();
  }, [currentpage, polling]);

  //total = 13997
  return (
    <div>
      <div className="btn-container">
        <button onClick={() => filter("dec")}>Sort by decending</button>
        <button onClick={() => filter("asc")}>Sort by ascending</button>
      </div>
      <table className="table">
        <tr className="table-tr">
          <th>City Image</th>
          <th>City</th>
          <th>District Names</th>
          <th>No of polling stations</th>
        </tr>
        {city &&
          city.map((el) => (
            <tr key={el._id} className="table-tr">
              <td className="tr-img">
                <img
                  src={el.cityimage}
                  alt="City"
                  onClick={() => redirectpage(el._id)}
                />
              </td>
              <td className="tr-city" onClick={() => redirectpage(el._id)}>
                {el.cityname.toUpperCase()}
              </td>
              <td className="tr-dist">
                {el.districts.map((district) => (
                  <li key={district._id}>{district.taluk.toUpperCase()}</li>
                ))}
              </td>
              <td>{el.pollingstations}</td>
            </tr>
          ))}
      </table>

      {totalarr.map((page) => (
        <button
          key={page}
          className={currentpage === page ? "btn-active" : "btn-totalarr"}
          onClick={() => changePage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
