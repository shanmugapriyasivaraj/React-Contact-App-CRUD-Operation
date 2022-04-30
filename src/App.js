import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import ContactList from "./Components/ContactList";
import AddContact from "./Components/AddContact";
import EditContact from "./Components/EditContact";
import ViewContact from "./Components/ViewContact";
import Spinner from "./Spinner/spinner";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts/list"} />} />
        <Route path={"/contacts/list"} element={<ContactList />} />
        <Route path={"/contacts/add"} element={<AddContact />} />
        <Route path={"/contacts/view/:contactId"} element={<ViewContact />} />
        <Route path={"/contacts/edit/:contactId"} element={<EditContact />} />
      </Routes>
    </React.Fragment>
  );
};
export default App;
