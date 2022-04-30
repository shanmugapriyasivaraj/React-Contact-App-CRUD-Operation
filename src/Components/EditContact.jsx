import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ContactService from "../Services/ContactService";
import Spinner from "../Spinner/spinner";

let EditContact = () => {
  let navigate = useNavigate();

  let { contactId } = useParams();

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

  useEffect(() => {
    async function fetchMyData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let groupRes = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupRes.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
    fetchMyData();
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = (event) => {
    event.preventDefault();
    try {
      let response = ContactService.updateContact(state.contact, contactId);
      if (response) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate("/contacts/edit/${contactId}", { replace: false });
    }
  };

  let { loading, contact, groups, errorMessage } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <>
            <section className="add-contact p-3">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p className="h4 text-primary fw-bold">Edit Contact</p>
                    <p className="fst-italic">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      In quis facere architecto possimus dignissimos
                      perspiciatis quidem quaerat incidunt sint debitis, est
                      aspernatur error ipsum voluptatibus asperiores vel sit,
                      praesentium nulla.
                    </p>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <form onSubmit={submitForm}>
                      <div className="mb-2">
                        <input
                          name="name"
                          onChange={updateInput}
                          value={contact.name}
                          type="text"
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          name="photo"
                          onChange={updateInput}
                          value={contact.photo}
                          type="text"
                          className="form-control"
                          placeholder="Photo url"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          name="mobile"
                          onChange={updateInput}
                          value={contact.mobile}
                          type="number"
                          className="form-control"
                          placeholder="Mobile"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          name="email"
                          onChange={updateInput}
                          value={contact.email}
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          name="company"
                          onChange={updateInput}
                          value={contact.company}
                          type="text"
                          className="form-control"
                          placeholder="Company"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          name="title"
                          onChange={updateInput}
                          value={contact.title}
                          type="text"
                          className="form-control"
                          placeholder="Title"
                        />
                      </div>
                      <div className="mb-2">
                        <select
                          className="form-control"
                          name="groupId"
                          onChange={updateInput}
                          value={contact.groupId}
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
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <img src={contact.photo} className="contact-img" />
                  </div>
                </div>
              </div>
            </section>
          </>
        </>
      )}
    </>
  );
};

export default EditContact;
