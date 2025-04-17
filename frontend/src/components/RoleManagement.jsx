import React, { useState } from "react";
import { createRole, assignRole } from "../api/roleApi";

const RoleManagement = ({ token }) => {
  const [roleName, setRoleName] = useState("");
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");

  const handleCreateRole = async () => {
    try {
      const data = await createRole(roleName, token);
      console.log("Role created:", data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignRole = async () => {
    try {
      const data = await assignRole(userId, roleId, token);
      console.log("Role assigned:", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Role</h2>
      <input value={roleName} onChange={(e) => setRoleName(e.target.value)} />
      <button onClick={handleCreateRole}>Create</button>

      <h2>Assign Role</h2>
      <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
      <input value={roleId} onChange={(e) => setRoleId(e.target.value)} placeholder="Role ID" />
      <button onClick={handleAssignRole}>Assign</button>
    </div>
  );
};

export default RoleManagement;
