import React from "react";
import { AppContext } from '../Components/AppContext';
import { PersistentDrawerLeft } from '../Components/DrawerLeft';

function AppUI() {
    const {
        loading,
        error,
        searchedUsers,
        searchValue,
        setSearchValue,
        addUser,
        addUsersList,
        addDaysUser,
        quitDaysUser,
        deleteUser,
        modalAddValue, 
        setModalAddValue,
        modalDelValue, 
        setModalDelValue,
        nameToEdit, 
        setNameToEdit,
        addDaysToAllUsers,
        quitDaysToAllUsers,
    } = React.useContext(AppContext);

    return (
        <React.Fragment>
            <PersistentDrawerLeft
                loading={loading}
                error={error}
                searchedUsers={searchedUsers}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                addUser={addUser}
                addUsersList={addUsersList}
                addDaysUser={addDaysUser}
                quitDaysUser={quitDaysUser}
                deleteUser={deleteUser}
                modalAddValue={modalAddValue}
                setModalAddValue={setModalAddValue}
                modalDelValue={modalDelValue}
                setModalDelValue={setModalDelValue}
                nameToEdit={nameToEdit}
                setNameToEdit={setNameToEdit}
                addDaysToAllUsers={addDaysToAllUsers}
                quitDaysToAllUsers={quitDaysToAllUsers}
            />
        </React.Fragment>
    );
}

export { AppUI };