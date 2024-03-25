import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Employe } from "./EmployeList";

const API_URL = process.env.REACT_APP_API_URL;
const EditEmploye = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employeDetails, setEmployeDetails] = useState<Employe>();
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const getEmployeDetails = async () => {
    const url = `${API_URL}/employe/getEmployeById/${id}`;
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    } as RequestInit;

    const response = await fetch(url, option);
    const resData = await response.json();

    if (resData.success) {
      setEmployeDetails(resData.data);
      setCheckedValues(resData.data.f_Course);
    } else {
      alert(resData.message);
    }
  };

  useEffect(() => {
    getEmployeDetails();
  }, []);

  const handleCheckboxChange = (value: string) => {
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    } else {
      setCheckedValues([...checkedValues, value]);
    }
  };

  // const [selectedFile, setSelectedFile] = useState<any>(null);

  // const handleFileChange = (event: any) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const payload = {
      id:employeDetails!.f_Id,
      name: data.get("name") as string,
      email: data.get("email") as string,
      mobileNumber: data.get("mobileNumber") as string,
      designation: data.get("designation") as string,
      gender: data.get("gender") as string,
      course: checkedValues as string[],
      isActive: employeDetails!.f_IsActive,
      image: employeDetails!.f_Image
    };

    // const formData = new FormData();
    // formData.append("payload", JSON.stringify(payload));
    // formData.append("image", selectedFile);

    const url = `${API_URL}/employe/updateEmploye/${id}`;
    const option = {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({employeDetails:payload}),
    } as RequestInit;

    const response = await fetch(url, option);
    const resData = await response.json();

    if (resData.success) {
      navigate("/EmployeList");
    } else {
      alert(resData.message);
    }
  };
  return (
    <div className="">
      <div className="landing-page-header">Edit Employe</div>
      <div className="employe-page-body">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Name :</label>
            <input
              type="text"
              name="name"
              value={ employeDetails && employeDetails.f_Name}
              onChange={(e) =>
                setEmployeDetails({
                  ...employeDetails!,
                  f_Name: e.target.value,
                })
              }
              required
              placeholder="Enter Name"
            />
          </div>
          <div className="input-container">
            <label>Email :</label>
            <input
              type="text"
              name="email"
              required
              placeholder="Enter Email"
              value={ employeDetails && employeDetails.f_Email}
              onChange={(e) =>
                setEmployeDetails({
                  ...employeDetails!,
                  f_Email: e.target.value,
                })
              }
            />
          </div>
          <div className="input-container">
            <label>Mobile No :</label>
            <input
              type="text"
              name="mobileNumber"
              required
              placeholder="Enter Mobile No."
              value={ employeDetails && employeDetails.f_Mobile}
              onChange={(e) =>
                setEmployeDetails({
                  ...employeDetails!,
                  f_Mobile: e.target.value,
                })
              }
            />
          </div>
          <div className="input-container">
            <label>Designation :</label>
            <select style={{ padding: "5px" }} name="designation" required  value={ employeDetails && employeDetails.f_Designation}
              onChange={(e) =>
                setEmployeDetails({
                  ...employeDetails!,
                  f_Email: e.target.value,
                })
              }>
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
                  checked={employeDetails && employeDetails.f_gender==="M" ? true : false}
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
                  checked={employeDetails && employeDetails.f_gender==="F" ? true : false}
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
                  checked={checkedValues && checkedValues.includes("MCA") ? true : false}
                  onChange={() => handleCheckboxChange("MCA")}
                />{" "}
                MCA
              </div>

              <div style={{ display: "flex", width: "30px" }}>
                <input
                  type="checkbox"
                  value="BCA"
                  checked={ checkedValues && checkedValues.includes("BCA") ? true : false}
                  onChange={() => handleCheckboxChange("BCA")}
                />{" "}
                BCA
              </div>
              <div style={{ display: "flex", width: "30px" }}>
                <input
                  type="checkbox"
                  value="BSC"
                  checked={checkedValues && checkedValues.includes("BSC") ? true : false}
                  onChange={() => handleCheckboxChange("BSC")}
                />{" "}
                BSC
              </div>
            </div>
          </div>
          <div className="input-container">
            {/* <label>Img Upload :</label>
            <input
              type="file"
              name="uploadFile"
              required
              onChange={(e) => handleFileChange(e)}
            /> */}
            <div> Image : </div>
            <img src={employeDetails ? `${API_URL}/src/public/employe/${employeDetails.f_Image}` : ""} alt="NA" />
          </div>
          <div className="employe-submit-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmploye;
