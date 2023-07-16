// import { useState } from "react"
// // 
// export const App = () => {
//   //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& mes variables

//   const [array, setArraay] = useState([]);
//   const [arr, setArr] = useState([]);
//   const [value, setValue] = useState("")
//   const [column, setColumn] = useState("")

//   //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& mes Fonction

//   // ^^ delete div
//   const delet = (index, arr, setArr) => {
//     const newTab = [...arr]
//     newTab.splice(index, 1);
//     setArr(newTab)
//   }
  // // ^^ edite div
  // const edite = (index) => {
  //   const newTab = [...arr]
  //   let prop = prompt(`modify ur ${newTab[index]}`).trim()
  //   if (prop.length > 0) {
  //     newTab[index] = prop;
  //     setArr(newTab)
  //   }
  // }
//   // ^^ check div
//   const check = (event) => {
//     let parent = event.target.parentElement;
//     if (parent.style.background !== "green") {
//       parent.style.background = "green"
//     } else {
//       parent.style.background = ""
//     }
//   }
//   //^^ get input value
//   const inputt = (e, setTab,index) => {
//     setTab(e.target.value)

//   }
//   // ^^ add task
//   const add = (tab, setTab, value, setValue) => {
//     const newTab = [...tab, value];
//     setTab(newTab);
//     setValue("")
//   }
//   const addTask = (column,setTab,array ,setColumn) => {

//     const newTab = { nom: column, task: [] }
//     setTab([...array, newTab]);
//     setColumn("")
//   }


//   return (
//     <>
//       {/* input pour add a new column */}
//       <div className="add">
//         <input type="text" value={column} onChange={(event) => { inputt(event, setColumn) }} />
//         <button onClick={() => { addTask(column,setArraay,array ,setColumn) }}>add</button>
//       </div>

//       {/* add column */}
//       <div className="newColumn">
//         {
//           array.map((element, index) =>
//             <div key={index} className="flexx">
//               <h1>{element.nom}</h1>
//               <div className="globe">
//                 <div className="bg">
//                   <input type="text" value={value}  onChange={(event) => { inputt(event, setValue,index) }} />
//                   <button onClick={() => { add(arr,setArr,value,setValue) }} >go</button>
//                   {
//                     arr.map((elem, ind) =>
//                       <div className="glob">
//                       <h2>5</h2>
//                         {/* <h1>{elem}</h1> */}
//                         <button onClick={() => { edite(index) }}>edite</button>
//                         <button onClick={check}>check</button>
//                         <button onClick={() => { delet(index, arr, setArr) }}>delete</button>
//                         <select name="cars" id="cars">
//                           <option disabled selected value="choisir colunm">choisir column</option>
//                           {
//                             array.map((e, i) =>
//                               <option value={element}>{e}</option>
//                             )
//                           }

//                         </select>
//                       </div>
//                     )

//                   }
//                 </div>
//               </div>


//             </div>


//           )
//         }

//       </div>

//     </>
//   )

// }












// ** deuxieme fois 
import { useState } from 'react'

export const App = () => {

  const [list, setList] = useState([]);

  const [inputColumnValue, setInputColumnValue] = useState("")

  const [valueinput, setValueinput] = useState({
    indexValue: 0,
    value: ""
  })
  const addColumn = () => {
    const newColumn = {
      name: inputColumnValue,
      tableau: []
    }
    setList([...list, newColumn])
    setInputColumnValue("")
  }

  const delet = (index,indexList) => {
    const newTab = [...list];
    newTab[indexList].tableau.splice(index, 1);
    setList(newTab)
  }
  // ^^ edite div
  const edite = (index,indexTask) => {
    const newTab = [...list]
    let prop = prompt(`modify ur ${newTab[index].tableau[indexTask]}`).trim()
    if (prop.length > 0) {
      newTab[index].tableau[indexTask] = prop;
      setList(newTab)
    }
  }
  const addTask = (index) => {
    let updatedList = [...list];
    updatedList[index].tableau.push(valueinput);
    setList(updatedList);
    setValueinput({
      indexValue: 0,
      value: "",
    })
  }
  const changeList = (event , indexTask , indexList) => {
    //* Nouvelle liste
    let value = event.target.value ;
    //* Element à déplacer
    let updatedList = [...list];
    let element = updatedList[indexList].tableau[indexTask];
    delet(indexTask , indexList);

    for (let index = 0; index < updatedList.length; index++) {
        let e = updatedList[index];
        if (e.name === value) {
            e.tableau.push(element);
            setList(updatedList);
        }
    }
}

  return (

    <div>
      <input type="text" value={inputColumnValue} onChange={(e) => { setInputColumnValue(e.target.value) }} />
      <button onClick={() => { addColumn() }}>go</button>


      <div className='d-flex'>
        {
          list.map((element, index) =>
            <>
              <div key={index} >
                <h1>{element.name}</h1>
                <div>
                  <input type="text" value={valueinput.value} onChange={(event) => { setValueinput(event.target.value) }} />
                  <button onClick={() => { addTask(index) }} type="button">add</button>
                </div>
                {
                  element.tableau.map((elem, inde) =>
                    <>
                      <div className="glob">
                        <h2>{elem}</h2>
                        <button onClick={()=>{
                          edite(index,inde)
                        }} >edite</button>
                        <button onClick={()=>{
                          delet(inde, index)
                        }} >delete</button>
                        <select name="cars" id="cars"   onChange={(event)=>{
                          changeList(event , inde , index)
                        }}>
                          <option disabled selected value="choisir colunm">choisir column</option>
                          {
                            list.map((e, i) =>
                              e.name === element.name ?
                                <></>
                                :
                                <option value={e.name}>
                                  {e.name}
                                </option>
                            )
                          }

                        </select>
                      </div>
                    </>
                  )
                }
              </div>


            </>
          )
        }

      </div>
    </div>
  )
}

