import React, {useEffect, useState} from 'react';
import UniversalModal from "../UniversalModal/UniversalModal";
import Table from "../Table/Table";
import {connect, useSelector} from "react-redux";
import {territoryActions} from "../../Redux/reducers/TerritoryReducer";
import YandexMap from "../YMap/YandexMap";
import ContentLoader from "../Loading/ContentLoaders";

function Index(props) {
    const territoryObj = useSelector(state => state.territoryReducer.territoryObj);

    const [identifier, setIdentifier] = useState(
        {title: "", code: "", sorting: 0, active: false}
    )
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const [inputs, setInputs] = useState([
        {type: "text", desc: "Title", required: true, action: TitleValueHandler, value:identifier.title},
        {type: "text", desc: "Code", required: false, action: CodeValueHandler, value: identifier.title},
        {type: "number", desc: "Sorting", required: false, action: SortingValueHandler, value: identifier.title     },
        {
            type: "checkbox",
            desc: "Active",
            required: false,
            action: ActiveHandler,
            value: "",
            checked: identifier.active
        },
    ])
    const [buttons, setButtons] = useState([])
    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        console.log(props.isEdit)
    },[])




    function TitleValueHandler(e) {
        identifier.title = e.target.value
        setIdentifier({...identifier,title:e.target.value})
        let state = inputs.map(input => {
            if (input.desc === "Title") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(state)
        props.setTerritoryTitle(e.target.value)
    }
    function CodeValueHandler(e) {
        identifier.code = e.target.value
        setIdentifier({...identifier})
        let state = inputs.map(input => {
            if (input.desc === "Code") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(state)
        props.setTerritoryCode( e.target.value)
    }
    function SortingValueHandler(e) {
        identifier.sorting = e.target.value
        setIdentifier({...identifier})
        let state = inputs.map(input => {
            if (input.desc === "Sorting") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(state)
        props.setTerritorySorting(e.target.value)
    }
    function ActiveHandler(e) {
        identifier.active = e.target.checked
        setIdentifier({...identifier})
        let state = inputs.map(input => {
            if (input.desc === "Active") {
                input.checked = e.target.checked
            }
            return input
        })
        setInputs(state)
        props.setTerritoryActive( e.target.checked)
    }



    function handleVisible(boolean) {
        setIdentifier({title: "", code: "", sorting: 0, active: false})
        setIsVisible(boolean)
        props.setTerritoryLocation({longitude: 0, latitude: 0})
        props.setTerritoryActive(false)
        props.setTerritoryTitle("")
        props.setIsEdit(false)
        props.setTerritoryCode("")
        let clearedInputs = inputs.map(input=>({...input, value: ""}))
        setInputs(clearedInputs)
    }

    useEffect(() => {
        props.getTerritory();
    }, [])

    // function addEditButton(){
    //     let a = props.data.map(item=>{
    //         return {...item, action}
    //     })
    // }

    function editFunction(item){
        // let variable={title: item.title,code: item.code,sorting: item.sorting,active: item.active}
        // identifier.title=item.title
        // identifier.code=item.code
        // identifier.sorting=item.sorting
        // identifier.active=item.active
        // setIdentifier(identifier)
        setIsVisible(true)
        // setInputs([...inputs])
 //       title: "", code: "", sorting: 0, active: false}
        //        console.log("Inputs",inputs)
        props.setTerritoryLocation({longitude: item.longitude, latitude: item.latitude})
        props.setTerritoryActive(item.active)
        props.setTerritoryTitle(item.title)
        props.setIsEdit(item.id)
        props.setTerritoryCode(item.code)
        // props.setTerritorySorting(item.sorting)
        let a = inputs.map(input=>{
            switch (input.desc) {
                case "Title":
                    return {...input, value: item.title}
                case "Code":
                    return {...input, value: item.code}
                case "Active":
                    return {...input, value: item.active}
                default:
                    return input
                // case "Sorting":
                //     return {...input, value: item.sorting}
            }
        })
        setInputs(a)

    }


    return (
        <div>

             <div style={{maxWidth:"120%",maxHeight:"100%",overflowY:"scroll"}}>
                 {
                     loading?
                       <div style={{marginLeft:400}}>
                           <ContentLoader />
                       </div>
                         :

                         <div>
                             <UniversalModal data={territoryObj} width={800} height={400} visible={isVisible} inputs={inputs} yandexMap={<YandexMap location={{longitude:props.territoryObj.longitude,latitude:props.territoryObj.latitude}} action={territoryActions.setTerritoryLocation} />}
                                             setVisible={() => handleVisible(false)} buttons={buttons} editButton={props.editTerritory} isEdit={props.isEdit} saveButton={{formData: territoryObj, action: props.saveTerritory}}/>


                             <button style={{marginLeft:850,marginTop:20}} onClick={() => handleVisible(true)}
                                     className={"bg-green-600 text-white rounded-md px-1 py-2 "}>add territory
                             </button>
                             <div style={{marginLeft:20,marginTop:-40}}>
                                 {/*<select  onChange={(e) => searching(e.target.value)} name="" id="" className="form-select w-25">*/}
                                 {/*    <option value="true">Active</option>*/}
                                 {/*    <option value="false">In Active</option>*/}
                                 {/*</select>*/}
                             </div>



                             <div style={{marginTop:50}}>

                                 <Table
                                     dataProps={props.data}
                                     columnsProps={props.columns}
                                     pagination={true}
                                     changeSizeMode={true}
                                     paginationApi={"/api/territory?page={page}&size={limit}"}
                                     columnOrderMode={true}
                                     changeSizeModeOptions={[5, 10, 20, 30, 40, 50]}
                                     editingButton={(item) => editFunction(item)}
                                 />
                             </div>

                         </div>
                 }

             </div>

        </div>

    );
}

export default connect(state=>state.territoryReducer, territoryActions)(Index);