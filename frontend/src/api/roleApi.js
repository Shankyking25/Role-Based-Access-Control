import axios from "axios";

// ✅ Create a role
export const createRole = async (roleName, token) => {
  const response = await axios.post(
    "/api/roles/create",
    { name: roleName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ✅ Assign a role to a user
export const assignRole = async (userId, roleId, token) => {
  const response = await axios.post(
    "/api/roles/assign",
    { userId, roleId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
