/**
 * @author Ahmed Rafsan Raqib
 * This is the main module where the Application is initiated.
 */
import "./App.css";
import DriverSearchForm from "./Components/DriverSearchForm";
import React from "react";
import ApplicationFooter from "./Components/ApplicationFooter";
import ListDrivers from "./Components/ListDrivers";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import determineLatLongFromAddress from "./Geolocation/locationServices";
import { determineDistanceBetweenDriverPatient } from "./Geolocation/locationServices";
import { useDispatch } from "react-redux";
import axios from "axios";

function App() {
  const [patientInfo, setPatientName] = React.useState(null);
  const [patientPickupAddress, setPatientPickupAddress] = React.useState(null);
  const [patientPickupTime, setPatientPickupTime] = React.useState(null);
  const [patientNotes, setPatientNotes] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  var driversList;
  const optimumDriversList = useSelector(
    (patientData) => patientData.optimumDriversList
  );

  const patientPickupInfo = useSelector((patientData) => patientData);

  // Submit function that initiate a cascade of other functions to access data from
  // database and calculate optimum drivers for the patient
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gets all the Drivers from the Database and updates the State.
    await getAllDrivers();
    // Determine lattitude and longitude from address
    const { lat, lng } = await determineLatLongFromAddress(
      patientPickupAddress
    );
    var tempOptimumDriverList = [];
    driversList.forEach(function (driver) {
      const lat1 = driver.latitude;
      const lng1 = driver.longitude;

      //Calculate distance between Driver and Patient
      var distance = determineDistanceBetweenDriverPatient(
        lat,
        lng,
        lat1,
        lng1
      );
      const driverData = {
        id: driver.driverID,
        driverName: driver.name,
        vehicleId: driver.vehicleId,
        distanceFromPatient: distance.toFixed(1),
      };

      tempOptimumDriverList.push(driverData);
    });

    // Sorting list to display nearest Driver first
    sortDriversList(tempOptimumDriverList);

    // Sending data to redux store
    dispatchDataToReduxStore(tempOptimumDriverList);

    // Navigates to the page where the drivers list is displayed
    navigateToListDriversPage();
  };

  // Contructs and executes an Axios API call to the backend. The backend recieves the request
  // and queries the database for all driver records which is then send back as part of the
  // response.
  const getAllDrivers = async () => {
    await axios
      .get("http://localhost:3001/getDrivers")
      .then((response) => (driversList = response.data.Drivers));
  };

  //Sorts the supplied drivers list to show the nearest drivers first
  const sortDriversList = (unSortedDriverList) => {
    unSortedDriverList.sort(function (a, b) {
      return a.distanceFromPatient - b.distanceFromPatient;
    });
  };

  // Dispatches the data to Redux store, promotes a global storage where
  // the storage data (State) can be accessed from anywhere.
  const dispatchDataToReduxStore = (optimumDriverList) => {
    dispatch({
      type: "SETPATIENTDATA",
      payload: {
        id: patientInfo,
        patientPickupAddress,
        patientPickupTime,
        patientNotes,
        optimumDriverList,
      },
    });
  };

  //Navigate to list drivers page.
  const navigateToListDriversPage = () => {
    navigate("/listDrivers");
  };
  //Method that creates the email
  const createPatientDataObject = (data) => {
    const patientData = {
      patientName: patientPickupInfo.patientName,
      patientAddress: patientPickupInfo.pickupAddress,
      pickupTime: patientPickupInfo.pickupTime,
      patientNotes: patientPickupInfo.pickupNotes,
      assignedDriverId: data.id,
    };

    sendPatientDataToDatabase(patientData);
  };

  const sendPatientDataToDatabase = async (patientData) => {
    await axios.post("http://localhost:3001/setPatient", patientData);
  };

  return (
    <div className="container">
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <DriverSearchForm
                onButtonClick={handleSubmit}
                label1={"Patient Name"}
                label1Placeholder={"Example, Firstname M Lastname.."}
                label1OnChange={setPatientName}
                label2={"Pickup Address"}
                label2Placeholder={"Apt no., Street, City, Zip, State"}
                label2OnChange={setPatientPickupAddress}
                label3={"Pickup Time"}
                label3Placeholder={"Example, 11:05 AM.."}
                label3OnChange={setPatientPickupTime}
                label4={"Pickup Notes"}
                label4Placeholder={"Patient Notes.."}
                label4OnChange={setPatientNotes}
                buttonLabel={"Drivers"}
              />
            }
            exact
          />
          <Route
            path="/listDrivers"
            element={
              <ListDrivers
                listToRender={optimumDriversList}
                initiateClickEvent={createPatientDataObject}
              />
            }
          />
          <Route component={Error}></Route>
        </Routes>
      </div>

      <div>
        <ApplicationFooter />
      </div>
    </div>
  );
}

export default App;
