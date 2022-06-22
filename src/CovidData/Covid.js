import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "../CovidData/Covid.css"

const Covid = () => {

    // Api Maping

    const [data, setData] = useState([])
    const [orginalData, setOriginalData] = useState([])
    const [dateRange, setDateRange] = useState({ start: "", end: "" })

    const Apicalling = () => {
        axios.get("https://data.covid19india.org/v4/min/timeseries.min.json").then((rec) => {
            // console.log(rec.data.AN.dates);
            setData(rec.data.AN.dates)
            setOriginalData(rec.data.AN.dates)
        }).catch((err) => {
            console.log(err, "Error")
        })
    }

    useEffect(() => {
        Apicalling();
    }, [])


    // Filter data

    const genrateToken = () => {
        console.log(data);
        let filteredData = Object.keys(data).filter((date, index) => {
            let current=new Date(date);
            if (current >= dateRange.start && current<=dateRange.end ) {
                return date
            }
        })
        let newData={}
        console.log(filteredData);
        filteredData.map(key=>{
            // console.log(key);
            newData[key]=data[key];
        })
       setData(newData)
        console.log(newData);


        // Token Genragte

        // fetch(`https://ndh2jbwsp7pby4rlu32cadqsyq0owusx.lambda-url.us-east-2.on.aws/generateToken`,{
        //     method: "POST",
        //     headers: {

        //     Accept: "application/json",

        //     // "Content-Type": "application/json",

        //     'Content-Type': 'multipart/form-data',

        //     // Authorization: "Token " + localStorage.getItem("api_key"),

        //     },
        //     body: JSON.stringify({"name":"Akil","email":"usamamusab16@gmail.com"}),
        //     }).then((rec) => {
        //             console.log(rec);
        //             // setData(rec.data)

        //         }).catch((err) => {
        //             console.log(err, "Error")
        //         })
    }
    useEffect(() => {
        if (dateRange.start && dateRange.end) {
            genrateToken()
        }
    }, [dateRange])

    return (
        <div>
            <div className="datesection">
                <h2>Select Date</h2>
                <label for="strt">Start : </label>
                <input type={"date"} id="strt" onChange={(e) => setDateRange({ ...dateRange, start: new Date(e.target.value) })} />
                <p>TO</p>
                <label>End : </label>
                <input type={"date"} onChange={(e) => setDateRange({ ...dateRange, end: new Date(e.target.value) })} />
            </div>
            <h3 className="datatable">Data Table</h3>
            <div className="main">
                <div className="body">

                    <table>
                        <tr>
                            <th rowSpan="2" style={{ width: "90px", borderTopLeftRadius: "20px" }}>Date</th>
                            <th colSpan="5">Delta</th>
                            <th colSpan="5">Dalta-7</th>
                            <th colSpan="6" style={{ borderTopRightRadius: "20px" }}>Total</th>
                        </tr>
                        <tr style={{ backgroundColor: "black", color: "white" }}>
                            <td>Confirmed</td>
                            <td>Recovered</td>
                            <td>Tested</td>
                            <td>Vaccinated1</td>
                            <td>Vaccinated2</td>
                            <td>Confirmed</td>
                            <td>Recovered</td>
                            <td>Tested</td>
                            <td>Vaccinated1</td>
                            <td>Vaccinated2</td>
                            <td>Confirmed</td>
                            <td>Deceased</td>
                            <td>Recovered</td>
                            <td>Tested</td>
                            <td>Vaccinated1</td>
                            <td>Vaccinated2</td>
                        </tr>
                        {Object.keys(data).map((key, index) => {
                            let cases = data[key];
                            // console.log(cases);
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{cases.delta && cases.delta.confirmed}</td>
                                    <td>{cases.delta && cases.delta.recovered}</td>
                                    <td>{cases.delta && cases.delta.tested}</td>
                                    <td>{cases.delta && cases.delta.vaccinated1}</td>
                                    <td>{cases.delta && cases.delta.vaccinated2}</td>
                                    <td>{cases.delta && cases.delta7.confirmed}</td>
                                    <td>{cases.delta && cases.delta7.recovered}</td>
                                    <td>{cases.delta && cases.delta7.tested}</td>
                                    <td>{cases.delta && cases.delta7.vaccinated1}</td>
                                    <td>{cases.delta && cases.delta7.vaccinated2}</td>
                                    <td>{cases.delta && cases.total.confirmed}</td>
                                    <td>{cases.delta && cases.total.deceased}</td>
                                    <td>{cases.delta && cases.total.recovered}</td>
                                    <td>{cases.delta && cases.total.tested}</td>
                                    <td>{cases.delta && cases.total.vaccinated1}</td>
                                    <td>{cases.delta && cases.total.vaccinated2}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Covid