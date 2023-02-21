import React, { FC } from "react";
import NewConnectionContainer from "./components/NewConnectionContainer";
import { useNavigate } from "react-router-dom";
import Arrow from "assets/icons/Arrow";
import Line from "components/Line";
import RoundButton from "components/Buttons/RoundButton";
import WarningBar from "./components/WarningBar";
import { commonStrings } from "strings/commonStrings";

const Home: FC = () => {
  const navigate = useNavigate();

  const onClickTripsHandler = () => {
    navigate(`/mytrips`);
  };

  const onTravelToAirportHandler = () => {
    navigate(`/connections/new`, {
      state: { rideType: commonStrings.DESTINATION_RIDE },
    });
  };

  const onTravelFromAirportHandler = () => {
    navigate(`/connections/new`, {
      state: { rideType: commonStrings.ORIGIN_RIDE },
    });
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <WarningBar />
      <NewConnectionContainer
        onTravelToAirportHandler={onTravelToAirportHandler}
        onTravelFromAirportHandler={onTravelFromAirportHandler}
      />
      <Line />
      <div className="flex flex-col w-4/5">
        <RoundButton
          text={"My Trips"}
          onClickHandler={onClickTripsHandler}
          IconParam={Arrow}
        />
      </div>
    </div>
  );
};

export default Home;