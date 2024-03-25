import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const CreateEmpoye = () => {

  const navigate = useNavigate()
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    } else {
      setCheckedValues([...checkedValues, value]);
    }
  };

  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileChange = (event :any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const payload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      mobileNumber: data.get("mobileNumber") as string,
      designation: data.get("designation") as string,
      gender: data.get("gender") as string,
      course: checkedValues as string[],
    };

    const formData = new FormData();
    formData.append("payload", JSON.stringify(payload));
    formData.append('image', selectedFile);

    const option = {
      method: "POST",
      body: formData,
    } as RequestInit;
    
    const url = `${API_URL}/employe/addEmploye`;

    const response = await fetch(url, option);
    const resData = await response.json();

    if (resData.success) {
      navigate("/EmployeList")
    } else {
      alert(resData.message);
    }
  };
  return (
    <div className="">
      <div className="landing-page-header">Create Employe</div>
      <div className="employe-page-body">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Name :</label>
            <input type="text" name="name" required placeholder="Enter Name" />
          </div>
          <div className="input-container">
            <label>Email :</label>
            <input
              type="text"
              name="email"
              required
              placeholder="Enter Email"
            />
          </div>
          <div className="input-container">
            <label>Mobile No :</label>
            <input
              type="text"
              name="mobileNumber"
              required
              placeholder="Enter Mobile No."
            />
          </div>
          <div className="input-container">
            <label>Designation :</label>
            <select style={{ padding: "5px" }} name="designation" required>
              <option value=""> select </option>
              <option value="HR"> HR </option>
              <option value="Manager"> Manager </option>
              <option value="Sales"> Sales </option>
            </select>
          </div>
          <div className="input-container">
            <label>Gender :</label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100px",
              }}
            >
              <div style={{ display: "flex", width: "30px" }}>
                <input
                  type="radio"
                  name="gender"
                  required
                  id="gender"
                  value="M"
                />{" "}
                M
              </div>
              <div style={{ display: "flex", width: "30px" }}>
                <input
                  type="radio"
                  name="gender"
                  required
                  id="gender"
                  value="F"
                />{" "}
                F
              </div>
            </div>
          </div>
          <div className="input-container">
            <label> Course :</label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "250px",
              }}
            >
              <div style={{ display: "flex", width: "30px" }}>
                <input
                  type="checkbox"
                  value="MCA"
                  checked={checkedValues.includes("MCA")}
                  onChange={() => handleCheckboxChange("MCA")}
                />{" "}
                MCA
              </div>

              <div style={{ display: "flex", width: "30px" }}>
                <input
                  type="checkbox"
                  value="BCA"
                  checked={checkedValues.includes("BCA")}
                  onChange={() => handleCheckboxChange("BCA")}
                />{" "}
                BCA
              </div>
              <div style={{ display: "flex", width: "30px" }}>
                <input
                  type="checkbox"
                  value="BSC"
                  checked={checkedValues.includes("BSC")}
                  onChange={() => handleCheckboxChange("BSC")}
                />{" "}
                BSC
              </div>
            </div>
          </div>
          <div className="input-container">
            <label>Img Upload :</label>
            <input type="file" name="uploadFile"  onChange={(e)=>handleFileChange(e)}/>
          </div>
          <div className="employe-submit-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmpoye;
