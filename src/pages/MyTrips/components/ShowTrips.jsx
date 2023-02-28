import React from "react";
import { getfilteredTrips } from "../helpers";
import TripsList from "./TripsList";

const ShowTrips = (props) => {
  const { myTrips } = props;
  if (!myTrips) {
    return null;
  }
  const filteredTrips = getfilteredTrips(myTrips);
  return (
    <>
      <TripsList
        heading={"Upcoming Trips"}
        tripsList={filteredTrips[0]}
        upcoming={true}
      />
      <div className="mt-10 pb-16">
        <TripsList
          heading={"Completed Trips"}
          tripsList={filteredTrips[1]}
          upcoming={false}
        />
      </div>
    </>
  );
};

export default ShowTrips;
