/**
 * @author Ahmed Rafsan Raqib
 * This component displays the nearest driver to the patient in real time.
 */
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export default function CheckboxListSecondary(props) {
  if (props.listToRender === null) {
    return <div>Please go back and submit the form again,Thank you</div>;
  }
  return (
    <div>
      <List dense sx={{ width: "100%", maxWidth: 360 }}>
        {props.listToRender.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          return (
            <ListItem key={value.vehicleId}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar src={`/static/images/avatar/${value + 1}.jpg`} />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  onClick={() => props.initiateClickEvent(value)}
                  primary={value.driverName}
                  secondary={value.distanceFromPatient + " miles"}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
