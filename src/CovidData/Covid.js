import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "../CovidData/Covid.css"

const Covid = () => {

    const [data, setData] = useState([])


    const Apicalling2 = () => {
        axios.get("https://data.covid19india.org/v4/min/timeseries.min.json").then((rec) => {

            setData(rec.data.AN)

        }).catch((err) => {
            console.log(err, "Error")
        })
    }
    console.log("Covid Data", data);

    useEffect(() => {
        Apicalling2();

    }, [])


    return (
        <>
            <div className="main">
                <div className="body">

                    <table border={1}>
                        <tr>
                            <th>Date</th>
                            <th>Delta</th>
                            <th>Dalta-7</th>
                            <th>Total</th>
                        </tr>
                        <tr>

                            {data && data.length && data.map((item) => {
                                return (
                                    <>
                                        <td>{item.dates}</td>                                    
                                    </>
                                )
                            })}
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Covid