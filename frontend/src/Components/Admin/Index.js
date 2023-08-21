import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {dashboardModel} from '../../Redux/reducers/DashboardReducer';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import clients from '../../Images/clients.png';
import './AdminStyleSheet.css';
import location from "../../Images/location.png"
import request from "../../Images/request.png"
import rocked from "../../Images/rocket.png"
import basket from "../../Images/basket.png"
import books from "../../Images/books.png"
import android from "../../Images/android.jpg"
import settings from "../../Images/settings.png"
import diagram from "../../Images/diagram.png"
import bell from "../../Images/bell.png"
import user from "../../Images/user.png"
import money from "../../Images/money.png"
import key from "../../Images/key.png"
import shutdown from "../../Images/shutdown.png"
import MenuListComposition from "./MenuListCompositioon";

function Index(props) {
    const {dashboardReducer} = props;
    const [nowtime, setNowtime] = useState('');
    const [phone, setPhone] = useState('');
    const [dashboard2, setDashboard] = useState([]);
    const [pagee, setPagee] = useState(false);
    const [showClientsModal, setShowClientsModal] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        axios({
            url: 'http://localhost:8080/dashboard',
            method: 'get',
        }).then(res => {
            setDashboard([res.data.body]);
        });
    }, []);


    function openClientsModal() {
        setShowClientsModal(true);

    }
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnterF = () => {
        setIsHovered(true);
    };

    function clientss() {
        setShowClientsModal(false)
        navigate("/admin/client")
    }

    function clientsMap() {
        setShowClientsModal(false)
        navigate("/admin/map")

    }

    function handleMouseLeaveF() {
        setIsHovered(false);
    }

    return (
        <div>
            <div className="w-full pl-32 fixed h-[70px] bg-gray-600 text-white flex items-center z-50">
                <div>
                    <img
                        style={{borderRadius: '50%', position: 'absolute', top: '10px', left: '25px'}}
                        className={'w-[70px] h-[60px]'}
                        src={logo}
                        alt=""
                    />
                </div>
                <div className={'d-flex w-100 align-items-center justify-between h-100  bg-[#405058]'}>
                    <div>
                        <ul className={'flex gap-4'}>
                            <li className={'cool-link '}>Supervisor</li>
                            <li className={'cool-link'}>Sales</li>
                            <li className={'cool-link'}>Cash register</li>
                            <li className={'cool-link'}>GPS</li>
                            <button className="button-71 flex justify-content-center items-center" role="button">
                                OnlineHelp
                            </button>
                        </ul>
                    </div>
                    <div>
                        <ul className={'flex align-items-center gap-2'}>
                            {dashboard2.map((item, index) => (
                                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                    <div key={index} className={'dateStyle'}>
                                        <li> 🗓️{item.localDate}</li>
                                    </div>
                                    <li style={{fontSize: '30px'}}>+{item.phone}</li>
                                </div>
                            ))}
                            <li className={'flex gap-1'} style={{marginLeft: 50}}>
                                <MenuListComposition/>
                                {/*<img className={'w-16 h-8'} src={bell} alt="" />*/}
                                {/* Add your MenuListComposition here */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={'flex w-[460px] h-[100%] gap-24  relative'}>
                <div
                    className="left-div h-full w-[120px] bg-gray-600 p-2  text-white text-center overflow-hidden fixed z-10">
                    <ul className={'mt-20 w-full h-full flex flex-col items-center'}>
                        <li className={'mt-2 w-6 h-[12%] flex justify-center items-center flex-col'}>
                            <div className="img-container">
                                <img src={rocked} alt=""/>
                            </div>
                            <div className={'text-container'}>Plans</div>
                            <hr className="divider"/>
                        </li>
                        <li className={'w-6 h-[12%] flex justify-center items-center flex-col'}>
                            <div className="img-container">
                                <img src={basket} alt=""/>
                            </div>
                            <div className={'text-container'}>Applications</div>
                            <hr className="divider"/>
                        </li>
                        <li className={'w-6 h-[12%] flex justify-center items-center flex-col'}>
                            <div className="img-container">
                                <img src={books} alt=""/>
                            </div>
                            <div>Stock</div>
                            <hr className="divider"/>
                        </li>
                            <button className={"dashboard_clients_button p-2"} onMouseEnter={handleMouseEnterF}
                                    onMouseLeave={handleMouseLeaveF} style={{display:"flex", flexDirection:"column", borderBottom:"0.5px solid white", gap:"10px",zIndex: "10000", width:"100%", alignItems:"center", marginTop:"10px"}}>
                                <img width={30} src={clients} alt=""/>
                                <span>Clients</span>
                            </button>
                        <hr/>
                        <li className={'w-6 h-[12%] flex justify-center items-center flex-col'}>
                            <div className="img-container">
                                <img src={android} alt=""/>
                            </div>
                            <div>Agents</div>
                            <hr className="divider"/>
                        </li>
                        <li className={'w-6 h-[12%] flex justify-center items-center flex-col'}>
                            <div className="img-container">
                                <img src={diagram} alt=""/>
                            </div>
                            <div>Reports</div>
                            <hr className="divider"/>
                        </li>
                        <Link to={'/admin/settings'} onClick={() => setShowClientsModal(false)}
                              className={'w-6 h-[12%] flex justify-center items-center flex-col'}>
                            <div className="img-container">
                                <img src={settings} alt=""/>
                            </div>
                            <div>Settings</div>
                            <hr className="divider"/>
                        </Link>
                    </ul>
                </div>
                <div className={'mt-20 h-full ml-[120px]'}>
                    <Outlet/>
                </div>
            </div>

            {/* Modal or content for Clients */}
            {isHovered &&
                <div onMouseEnter={handleMouseEnterF} onMouseLeave={handleMouseLeaveF} id={"clientDatasBox"}>
                    <p onClick={() => navigate("/admin/client") & setIsHovered(false)}>Clients</p>
                    <p onClick={() => navigate("/admin/map") & setIsHovered(false)}>Clients on the
                        map</p>
                    <p style={{padding: "0px"}}></p>
                </div>
            }
        </div>
    );
}

export default connect(state => state, dashboardModel)(Index);
