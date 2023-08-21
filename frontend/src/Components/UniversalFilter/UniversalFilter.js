import React, {useState} from 'react';
import Select from 'react-select';
import axios from "axios";
import tableSaga from "../../Redux/sagas/tableSaga";
import Table from "../Table/Table";
import {useDispatch} from "react-redux";
import {clientActions} from '../../Redux/reducers/ClientsReducer'

function UniversalFilter(props) {
    const [backendReq, setBackendReq] = useState([]);
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    let city = ""
    let customerCategory = ""
    let active = ""

    let tin = ""

    const handleCityChange = (param) => {
        let index = data.findIndex(item => item.name === param.name)


        if (param.name === "city") {
            param.value.map(item => {
                city += item.value + ","
            })
        }
        if (param.name === "customer category") {
            param.value.map(item => {
                customerCategory += item.value
            })
        }
        if (param.name === "active") {
            active=param.value.value
            // param.value.map(item => {
            // })
        }
        if (param.name === "tin") {
           tin=param.value.value
        }

        // axios({
        //     url: props.url,
        //     method: "get",
        //     params: {
        //         city: city1,
        //         customerCategory,
        //         active,
        //         tin
        //     }
        // }).then(res => {
        //     dispatch(clientActions.asadbeksFunction(res.data.content))
        // })
    };
    const customStyles = {
        control: (base) => ({
            ...base,
            width: 200,
        }),
    };

    function filters() {
        let city1 = city.substring(0, city.length - 1);
        let obj = {
            city: city1,
            customerCategory,
            active,
            tin
        }
        dispatch(clientActions.setFilters(obj))
        dispatch(clientActions.getClients(obj))

    }

    return (
        <div className="d-flex gap-2 mx-5" style={{width: 1000, flexWrap: 'wrap'}}>
            {props.multiple?.map((item) => (
                <Select
                    key={item.name}
                    name={item.name}
                    options={item.value}
                    isMulti
                    onChange={(selectedOptions) => handleCityChange({name: item.name, value: selectedOptions})}
                    placeholder={item.defaultValue}
                    styles={customStyles}
                />
            ))}
            {props.select?.map((item) => (
                <Select
                    key={item.name}
                    name={item.name}
                    options={item.value}
                    onChange={(e) => handleCityChange({name: item.name, value: e})}
                    style={{width: 70}}
                    placeholder={item.defaultValue}
                    styles={customStyles}
                />
            ))}
            <button onClick={()=>filters()} className="btn btn-outline-dark">filter</button>
        </div>
    );
}

export default UniversalFilter;
