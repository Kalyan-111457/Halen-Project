import UserService from "@/services/UserService";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setError, setLoading, setUsers } from "@/src/redux/slices/userSlice";
import { useEffect } from "react";



export default function Home() {

  const dispatch = useAppDispatch();

  const { Users, loading, error } = useAppSelector((state) => state.user);



  useEffect(() => {
    const fetchusers = async () => {

      try {
        dispatch(setLoading(true));
        const response = await UserService.ListOfUsers();

        if (response) {
          dispatch(setUsers(response));
        }
      }
      catch (error) {

        if (error instanceof Error) {
          setError(error.message);
        }
      }
      finally {
        setLoading(false)
      }
    }
    fetchusers();
  }, [dispatch]);



  const deleteuser = async (id: number) => {
    dispatch(setLoading(true));

    try {
      const response = await UserService.deleteUser(id);
      if (response) {
        alert("User is SuccessFully Deleted");
      }
    }
    catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));

      }
    }
    finally {
      dispatch(setLoading(false))
    }
  }





  return (

    < div className="" >

      <table border={1}>

        {loading && <p>Loading...</p>}

        {error && <p>{error.toLowerCase()}</p>}
        {Users.length > 0 ? (
          <>
            <thead>
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {Users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>

                  <td>
                    <button
                      onClick={() => {
                        if (user.id !== undefined) {
                          deleteuser(user.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td colSpan={7}>No Users Found</td>
            </tr>
          </tbody>
        )}
      </table>

    </div >
  );
}
