/**
 * @author Ahmed Rafsan Raqib
 * This is the Redux store module. It maintains a global state patientData which is accessible from
 * any component inside the application. The Reducer is reponsible for updating the state with the
 * supplied payload from the components.
 */
import { legacy_createStore as createStore } from "redux";

const patientData = {
  patientName: null,
  pickupAddress: null,
  pickupTime: null,
  pickupNotes: null,
  optimumDriversList: null,
};

const reducer = (state = patientData, action) => {
  switch (action.type) {
    case "SETPATIENTDATA":
      return {
        ...state,
        patientName: action.payload.id,
        pickupAddress: action.payload.patientPickupAddress,
        pickupTime: action.payload.patientPickupTime,
        pickupNotes: action.payload.patientNotes,
        optimumDriversList: action.payload.optimumDriverList,
      };

    default:
      return state;
  }
};

export default createStore(reducer);
