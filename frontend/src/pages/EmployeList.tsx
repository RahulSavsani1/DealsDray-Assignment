import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export type Employe = {
  _id: string;
  f_Id: string;
  f_Image: string;
  f_Name: string;
  f_Email: string;
  f_Mobile: string;
  f_Designation: string;
  f_gender: string;
  f_Course: string[];
  f_IsActive: boolean;
  createdAt: Date;
  updatedAt:Date;
};
const EmployeList = () => {

  const navigate = useNavigate()

  const [employeList, setEmployeList] = useState<Employe[]>([]);

  const getEmployeList = async () => {
    const url = `${API_URL}/employe/getEmploye`;
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    } as RequestInit;

    const response = await fetch(url, option);
    const resData = await response.json();

    if (resData.success) {
      setEmployeList(resData.data);
    } else {
      alert(resData.message);
    }
  };

  useEffect(() => {
    getEmployeList();
  }, []);

  const deleteEmploye = async(id : string) => {
    const url = `${API_URL}/employe/deleteEmploye/${id}`;
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    } as RequestInit;

    const response = await fetch(url, option);
    const resData = await response.json();

    if (resData.success) {
      setEmployeList(employeList.filter(prev=>prev._id!==id))
    } else {
      alert(resData.message);
    }
  }

   const [searchQuery, setSearchQuery] = useState<string>("");

   const handleSearchInputChange = (event : string ) => {
     setCurrentPage(1);
     setSearchQuery(event);
   };

   const filteredData = searchQuery!==null ? employeList.filter((item) =>
     item.f_Name.toLowerCase().includes(searchQuery.toLowerCase()) || item.f_Mobile.toLowerCase().includes(searchQuery.toLowerCase()) || item.f_Email.toLowerCase().includes(searchQuery.toLowerCase())
   ): []

   const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber : number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (

    <div className="">
      <div className="landing-page-header">Employe List</div>
      <div> Total Employe - {employeList.length ?? 0} </div>

      <input
        type="text"
        name="name"
        required
        placeholder="Search"
        style={{ padding: "8px" }}
        value={searchQuery}
        onChange={(e)=>handleSearchInputChange(e.target.value)}
      />

      <button onClick={()=>navigate("/CreateEmploye")}>Create Employe</button>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th> Unique Id </th>
            <th> Image </th>
            <th> Name </th>
            <th> Email </th>
            <th> Mobile No. </th>
            <th> Designation </th>
            <th> Gender </th>
            <th> Course </th>
            <th> Created At </th>
            <th colSpan={2}> Action </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((elem, index) => (
            <tr>
              <td>{elem.f_Id}</td>
              <td> <img src={`${API_URL}/src/public/employe/${elem.f_Image}`} alt="NA" /></td>
              <td>{elem.f_Name}</td>
              <td>{elem.f_Email}</td>
              <td>{elem.f_Mobile}</td>
              <td>{elem.f_Designation}</td>
              <td>{elem.f_gender}</td>
              <td>{elem.f_Course.map((course)=>{return `${course},`})}</td>
              <td>{new Date(elem.createdAt).toLocaleDateString()}</td>
              <td className="home-header-btn" onClick={()=>navigate(`/EditEmploye/${elem._id}`)}> Edit </td>
              <td className="home-header-btn" onClick={()=>deleteEmploye(elem._id)}> Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default EmployeList;
