import { UserChat } from "context/ChatContext";
import { Socket } from "context/SocketContext";
import { createNewConnection, createRideConnection } from "db/dbWrites";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStrings } from "constants/toastStrings";
import TileDetails from "../components/TileDetails";
import { useSelector } from "react-redux";
import { createUserObj } from "../helpers";

const AvailableConnectionTile = (props) => {
  const { rideDetails: otherRide, myRide, extraTime, extraDist } = props;
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const { dispatch } = UserChat();
  const socket = Socket();

  const { user: otherUser, location, timeStampRide } = otherRide;

  if (!otherUser || !otherRide) {
    return null;
  }

  const onClickHandler = async () => {
    if (!user || !otherUser) {
      return;
    }
    const toastId = toast.loading(toastStrings.CREATING_CONNECTION);
    try {
      const connectionId = await createNewConnection(user, otherUser);
      if (!connectionId) {
        toast.error(toastStrings.ERROR);
        return;
      }
      await createRideConnection(
        user,
        otherUser,
        myRide,
        otherRide,
        extraDist,
        extraTime,
        connectionId
      );
      socket.emit(
        "add-connection",
        { connectionId: connectionId },
        otherUser._id
      );
      toast.update(toastId, {
        render: toastStrings.MATCH_CREATION_SUCCESS,
        type: "success",
        isLoading: false,
        autoClose: 100,
        closeButton: true,
      });
      dispatch({
        type: "CHANGE_USER_CHAT",
        payload: { user: otherUser, chatId: connectionId },
      });
      navigate(`/chat/${connectionId}`);
    } catch (error) {
      toast.error(toastStrings.ERROR);
      console.log("Connection Failed", error);
    }
  };

  const userDetails = createUserObj(otherUser);
  const matchDetails = { extraTime, extraDist };
  const rideDetails = { timeStampRide, location };

  return (
    <TileDetails
      userDetails={userDetails}
      matchDetails={matchDetails}
      rideDetails={rideDetails}
      onClickHandler={onClickHandler}
    />
  );
};

export default AvailableConnectionTile;
