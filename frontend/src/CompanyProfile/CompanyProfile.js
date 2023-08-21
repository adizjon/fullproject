import React, {useEffect, useState} from 'react';
import apiCall from "../Components/Api/apiCall";
import ContentLoader from "../Components/Loading/ContentLoaders";
import Table from "../Components/Table/Table";

function CompanyProfile(props) {
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState(false)
    const column = [
        {
            id: 1,
            title: "Address",
            key: "address",
            type: "text",
            show: true,
        },

        {
            id: 2,
            title: "Company name",
            key: "company_name",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Email",
            key: "email",
            type: "email",
            show: true,
        },
        {
            id: 4,
            title: "Name",
            key: "name",
            type: "text",
            show: true,
        },
        {
            id: 5,
            title: "Region",
            key: "region",
            type: "text",
            show: true,
        },
        {
            id: 6,
            title: "SupportPhone",
            key: "supportPhone",
            type: "text",
            show: true,
        },

    ]
    useEffect(() => {
        apiCall({
            url: '/company',
            method: "get"
        }).then(res => {
            setCompany(res.data)
        })
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)

    }, [])
    return (
        <div>
            {
                loading ? <div style={{marginLeft: 400}}>
                        <ContentLoader/>
                    </div>
                    : <div>
                        <p style={{
                            marginLeft: 30,
                            marginTop: 50,
                            fontFamily: "unset",
                            fontSize: 25

                        }}>Company Profile</p>
                        <Table
                            dataProps={[]}
                            columnsProps={column}
                            paginationApi={`/company?page={page}&size={limit}`}
                            columnOrderMode={true}
                        />
                    </div>
            }
        </div>
    );
}

export default CompanyProfile;