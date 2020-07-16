import React from "react";

function ProfileCard(props) {
  const name = props.name;
  const imageURL = props.imageUrl;
  return (
    <div className="profile-card">
      <img className="profile-card-picture" src={imageURL} alt="" />
      <div className="profile-card-name">{name}</div>
    </div>
  );
}

export default ProfileCard;
