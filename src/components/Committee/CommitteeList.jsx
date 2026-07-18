import { useEffect, useState } from "react";
import {
  getAllCommitteeMembers,
  createCommitteeMember,
} from "../../api/committeeApi";
import { FaPhone, FaUserTie, FaPlus } from "react-icons/fa";
import "./CommitteeList.css";
import { getAllUsers } from "../../api/userApi";
import { isAdmin } from "../../utils/auth";
import { uploadImage } from "../../api/galleryApi";
import ImageUpload from "../Image/ImageUpload"; 

function CommitteeList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDialog, setShowDialog] = useState(false);

  const [users, setUsers] = useState([]);

  const [newMember, setNewMember] = useState({
    userId: "",
    position: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getAllCommitteeMembers();

      setMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    const response = await getAllUsers();

    setUsers(response.data);

    setShowDialog(true);
  };

  const handleSave = async () => {
  try {

    let photoId = null;

    if (selectedFile) {

      const formData = new FormData();

      formData.append(
        "file",
        selectedFile
      );

      formData.append(
        "entityType",
        "COMMITTEE"
      );

      formData.append(
        "parentEntityId",
        0
      );

      formData.append(
        "postedBy",
        "Admin"
      );

      const uploadResponse =
        await uploadImage(formData);

      photoId =
        uploadResponse.data.id;
    }

    await createCommitteeMember({
      ...newMember,
      photoId,
    });

    setShowDialog(false);

    setNewMember({
      userId: "",
      position: "",
    });

    setSelectedFile(null);

    fetchMembers();

  } catch (error) {

    console.error(
      "Error adding member",
      error
    );
  }
};

  if (loading) {
    return <h2>Loading Committee...</h2>;
  }

  return (
    <>
      <div className="committee-page">
        <div className="committee-card">
          {isAdmin() && (
            <button className="add-member-btn" onClick={handleAddMember}>
              <FaPlus /> Add Member
            </button>
          )}
        </div>

        <div className="committee-card">
          <div className="committee-container">
            {members.map((member) => (
              <div key={member.id} className="committee-card">
                <div className="photo-container">
                  <img
                    src={member.photoUrl || "/default-profile.png"}
                    alt={member.userName}
                    className="member-photo"
                  />
                </div>

                <h3 className="member-name">{member.userName}</h3>

                <div className="member-position">
                  <FaUserTie />
                  <label>Position</label>

                  <input
                    type="text"
                    placeholder="Chairman / Secretary"
                    value={newMember.position}
                    onChange={(e) =>
                      setNewMember({
                        ...newMember,
                        position: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Photo</label>

                  {/* <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  /> */}

                  <ImageUpload
    onFileSelect={setSelectedFile}
/>
                </div>

                <div className="member-contact">
                  <FaPhone />
                  <span>{member.contactNumber}</span>
                </div>

                {member.tower && (
                  <div className="member-info">
                    🏢 <span>{member.tower}</span>
                  </div>
                )}

                {member.flatNumber && (
                  <div className="member-info">
                    🚪 <span>Flat {member.flatNumber}</span>
                  </div>
                )}

                {member.role && (
                  <div className="member-role">{member.role}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2>Add Committee Member</h2>

            <label>Select User</label>

            <select
              value={newMember.userId}
              onChange={(e) =>
                setNewMember({
                  ...newMember,
                  userId: e.target.value,
                })
              }
            >
              <option value="">Select User</option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} - {user.phoneNumber}
                </option>
              ))}
            </select>

            <label>Position</label>

            <input
              type="text"
              placeholder="Chairman / Secretary"
              value={newMember.position}
              onChange={(e) =>
                setNewMember({
                  ...newMember,
                  position: e.target.value,
                })
              }
            />

            <div className="dialog-buttons">
              <button onClick={handleSave}>Save</button>

              <button
                onClick={() => {
                  setShowDialog(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommitteeList;
