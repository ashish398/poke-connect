import React from "react";
import { UserChat } from "context/ChatContext";
import { useNavigate } from "react-router-dom";
import PicContainer from "components/PicContainer";
import { createLocationString } from "helpers/utils";
import { createDateStringTrip } from "helpers/dateHelper";

const ConnectionElement = (props) => {
  const { connectionId, connectionData } = props;
  const { displayName = "", photoURL = "" } = connectionData.userInfo;
  const { location = "" } = connectionData.rideInfo;

  const navigate = useNavigate();

  const { dispatch } = UserChat();

  const onClickHandler = () => {
    dispatch({
      type: "CHANGE_USER_CHAT",
      payload: { user: connectionData.userInfo, chatId: connectionId },
    });
    navigate(`/chat/${connectionId}`);
  };

  const rideDate = connectionData.rideInfo.date
    ? createDateStringTrip(connectionData.rideInfo.date)
    : "No Date";

  return (
    <div
      className="flex flex-row py-8 px-2 justify-between items-center border-b border-primary gap-3"
      onClick={onClickHandler}
    >
      <div className="flex flex-row">
        <PicContainer src={photoURL} alt={displayName[0]} />
        <div className="info flex-col pl-2">
          <div className="text-black font-semibold flex justify-start text-lg">
            {displayName}
          </div>
          <div className="text-xs font-light text-typeText flex justify-start ">
            <p className="text-ellipsis overflow-hidden line-clamp-1">
              {createLocationString(location)}
            </p>
          </div>
        </div>
      </div>
      <div className="date flex-none flex justify-end text-sm text-typeText font-normal pl-1">
        {rideDate}
      </div>
    </div>
  );
};

export default ConnectionElement;
