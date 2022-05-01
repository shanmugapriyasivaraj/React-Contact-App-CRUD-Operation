import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactService from "../Services/ContactService";

let AddContact = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };
  async function fetchData() {
    try {
      setState({
        ...state,
        loading: true,
      });
      let response = await ContactService.getGroups();
      console.log("All data", response.data);
      setState({
        ...state,
        loading: false,
        groups: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  let submitForm = async (e) => {
    e.preventDefault();
    try {
      // let cntact = state.contact;
      // console.log("contact", contact);
      // let postContact = await axios.post(
      //   "http://localhost:9000/contacts",
      //   contact
      // );
      // console.log(postContact);
      let response = await ContactService.createContact(state.contact); //axios.post(dataURL, contact);
      console.log("data", response.data);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      console.log("error", error.message);
      setState({ ...state, errorMessage: error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  let { loading, contact, groups, errorMessage } = state;
  return (
    <>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Create Contact</p>
              <p className="fst-italic">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
                quis facere architecto possimus dignissimos perspiciatis quidem
                quaerat incidunt sint debitis, est aspernatur error ipsum
                voluptatibus asperiores vel sit, praesentium nulla.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Photo url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    type="number"
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="company"
                    value={contact.company}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <select
                    className="form-control"
                    required={true}
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                  >
                    <option value="">Select a Group</option>
                    {groups.length > 0 &&
                      groups.map((group) => {
                        return (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <input
                  type="submit"
                  className="btn btn-success"
                  value="Create"
                />
                <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
