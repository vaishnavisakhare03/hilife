import { useEffect, useState } from "react";
import { getAllCommitteeMembers } from "../../api/committeeApi";

import { FaPhone, FaUserTie } from "react-icons/fa";

import "./CommitteeList.css";

function CommitteeList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <h2>Loading Committee...</h2>;
  }

  return (
    <div className="committee-page">
      <div className="committee-card">
        <div className="committee-container">
          {members.map((member) => (
            <div key={member.id} className="committee-card">
              <div className="photo-container">
                <img
                  src={member.photo?.imageUrl}
                  alt={member.user?.name}
                  className="member-photo"
                />
              </div>

              <h3 className="member-name">{member.user?.name}</h3>

              <div className="member-position">
                <FaUserTie />
                <span>{member.position}</span>
              </div>

              <div className="member-contact">
                <FaPhone />
                <span>{member.user?.phoneNumber}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommitteeList;
