import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../api/userApi";
import ImageUpload from "../components/Image/ImageUpload";
import { uploadImage } from "../api/galleryApi";
import "./ProfilePage.css";

function ProfilePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [user, setUser] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editUser, setEditUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    tower: "",
    flatNumber: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getUserById(currentUser.id);

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };
const handleSave = async () => {
  console.log("Save clicked");

  try {
    console.log("user", user);
    console.log("editUser", editUser);

    let photoId = user.photoId || null;

    if (selectedFile) {

      console.log("Uploading image...");

      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("entityType", "USER");
      formData.append("parentEntityId", user.id);
      formData.append("postedBy", user.firstName);

      const uploadResponse = await uploadImage(formData);

      console.log("Upload response", uploadResponse.data);

      photoId = uploadResponse.data.id;
    }

    console.log("Updating user...");

    const response = await updateUser(user.id, {
      ...editUser,
      photoId,
    });

    console.log("Update response", response.data);

    setUser(response.data);

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("currentUser")),
        firstName: response.data.firstName,
      })
    );

    setShowEditDialog(false);
    setSelectedFile(null);

  } catch (error) {

    console.error("PROFILE SAVE ERROR", error);

  }
};

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        {user.photoUrl ? (
          <img src={user.photoUrl} className="profile-photo" alt="Profile" />
        ) : (
          <div className="profile-avatar">{user.firstName.charAt(0)}</div>
        )}

        <h2>
          {user.firstName} {user.lastName}
        </h2>

        <p>{user.role}</p>

        <div className="profile-info">
          <div className="info-row">
            <span>Phone</span>
            <strong>{user.phoneNumber}</strong>
          </div>

          <div className="info-row">
            <span>Tower</span>
            <strong>{user.tower}</strong>
          </div>

          <div className="info-row">
            <span>Flat</span>
            <strong>{user.flatNumber}</strong>
          </div>

          <div className="info-row">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => {
            setEditUser(user);

            setShowEditDialog(true);
          }}
        >
          Edit Profile
        </button>
      </div>
      {showEditDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2>Edit Profile</h2>

            <ImageUpload onFileSelect={setSelectedFile} />

            <input
              type="text"
              placeholder="First Name"
              value={editUser.firstName}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  firstName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Middle Name"
              value={editUser.middleName}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  middleName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Last Name"
              value={editUser.lastName}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  lastName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={editUser.phoneNumber}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  phoneNumber: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Tower"
              value={editUser.tower}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  tower: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Flat Number"
              value={editUser.flatNumber}
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  flatNumber: e.target.value,
                })
              }
            />

            <div className="dialog-buttons">
              <button className="upload-btn" onClick={handleSave}>
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
