import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const SinglePage = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  console.log("data:", data);

  const [dist, setDist] = useState([]);
  console.log("dist:", dist);

  async function getdatabyid() {
    let res = await fetch(`http://localhost:2100/city/${id}`);
    let d = await res.json();
    setData(d.citybyid);
    setDist(d.citybyid.districts);
  }

  useEffect(() => {
    getdatabyid();
  }, []);

  if (data) {
    return (
      <div>
        <img className="single-img" src={data.cityimage} alt="City" />
        <h2>{data.cityname}</h2>
        <div className="city-name">
          City Polling Stations{" "}
          <span class="polling-span">{data.pollingstations}</span>
        </div>
        <table className="table single-table">
          <tr className="table-tr">
            <th>Taluk Image</th>
            <th>Taluk Name</th>
            <th>No of polling stations</th>
          </tr>
          {dist.map((el) => (
            <tr key={el._id} className="table-tr">
              <td className="tr-img">
                <img src={el.distimage} alt="Taluk" width="200" />
              </td>
              <td>{el.taluk.toUpperCase()}</td>
              <td>{el.distpollingstations}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
};
