/**
 * @author Ahmed Rafsan Raqib
 * This Module contains two Methods determineLatLongFromAddress which takes in the address and
 * returns the lattitude and longitude data of the address and determineDistanceBetweenDriverPatient
 * which calculates the distance the driver is from the patient pickup zone.
 */
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDgsfpxic6s4iKc27-OmT1tgdyfcdTuOVQ");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const determineLatLongFromAddress = async (address) => {
  // Get latitude & longitude from address.
  const response = await Geocode.fromAddress(address);

  const { lat, lng } = response.results[0].geometry.location;

  return { lat, lng };
};

function determineDistanceBetweenDriverPatient(lat1, lon1, lat2, lon2) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}

export default determineLatLongFromAddress;
export { determineDistanceBetweenDriverPatient };
