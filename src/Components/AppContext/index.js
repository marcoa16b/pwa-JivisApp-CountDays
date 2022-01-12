import React from "react";
import { Storage } from "./Storage.js";

const AppContext = React.createContext();

function AppProvider(props) {
    const {
        users,
        saveUsers,
        loading,
        error,
    } = Storage('USERS_v1', []);

    const [searchValue, setSearchValue] = React.useState('');
    const [nameToEdit, setNameToEdit] = React.useState('');
    const [modalAddValue, setModalAddValue] = React.useState(false);
    const [modalDelValue, setModalDelValue] = React.useState(false);
    
    let searchedUsers = [];

    if (!searchValue.length >= 1){
        searchedUsers = users;
    } else {
        searchedUsers = users.filter(user => {
            const userText = user.name.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return userText.includes(searchText);
        });
    }

    const getActualDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }

    const addUser = (name) => {
        const newUsers = [...users];
        
        newUsers.push({
            name,
            days: 0,
            observations: [],
        });
        saveUsers(newUsers);
    }

    const addUsersList = (list) =>{
        const newUsers = [...users];
        list.map(name => (
            newUsers.push({name, days: 0, observations: []})
        ));
        saveUsers(newUsers);
    }

    const deleteUser = (name) => {
        const userIndex = users.findIndex(user => name.includes(user.name));
        const newUsers = [...users];
        newUsers.splice(userIndex, 1);
        saveUsers(newUsers);
    }

    const addDaysUser = (name, dias, obs) => {
        const numDays = parseInt(dias);
        const newUsers = [...users];
        const userIndex = newUsers.findIndex(user => name.includes(user.name));
        const usuario = newUsers.find(user => name.includes(user.name));
        const savaName = usuario.name;
        const newDays = usuario.days + numDays;
        const observs = usuario.observations;
        const fecha = getActualDate();
        observs.push({
            date: fecha,
            operation: "suma",
            days: numDays,
            observation: obs,
        })
        newUsers.splice(userIndex, 1);
        newUsers.push({
            name: savaName,
            days: newDays,
            observations: observs,
        })
        console.log(newUsers);
        saveUsers(newUsers);
    }

    const quitDaysUser = (name, dias, obs) => {
        const numDays = parseInt(dias);
        const newUsers = [...users];
        const userIndex = newUsers.findIndex(user => name.includes(user.name));
        const usuario = newUsers.find(user => name.includes(user.name));
        const savaName = usuario.name;
        const newDays = usuario.days - numDays;
        const observs = usuario.observations;
        const fecha = getActualDate();
        observs.push({
            date: fecha,
            operation: "resta",
            days: numDays,
            observation: obs,
        })
        newUsers.splice(userIndex, 1);
        newUsers.push({
            name: savaName,
            days: newDays,
            observations: observs,
        })
        console.log(newUsers);
        saveUsers(newUsers);
    }

    const addDaysToAllUsers = (obs) => {
        const newUsers = [...users];
        let usersUpdate = [];
        let usuario;
        for(let i = 0; i < newUsers.length; i++){
            usuario = newUsers[i];
            console.log(newUsers.length);
            let nombre = usuario.name;
            let dias = usuario.days;
            let observaciones = usuario.observations;
            const fecha = getActualDate();
            observaciones.push({
                date: fecha,
                operation: "suma",
                days: 1,
                observation: obs,
            })
            usersUpdate.push({
                name: nombre,
                days: dias + 1,
                observations: observaciones,
            });
        }
        console.log(usersUpdate);
        saveUsers(usersUpdate);
    }

    const quitDaysToAllUsers = (obs) => {
        const newUsers = [...users];
        let usersUpdate = [];
        let usuario;
        for(let i = 0; i < newUsers.length; i++){
            usuario = newUsers[i];
            console.log(newUsers.length);
            let nombre = usuario.name;
            let dias = usuario.days;
            let observaciones = usuario.observations;
            const fecha = getActualDate();
            observaciones.push({
                date: fecha,
                operation: "resta",
                days: 1,
                observation: obs,
            })
            usersUpdate.push({
                name: nombre,
                days: dias - 1,
                observations: observaciones,
            });
        }
        console.log(usersUpdate);
        saveUsers(usersUpdate);
    }

    return (
        <AppContext.Provider value={{
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
        }}>
            {props.children}
        </AppContext.Provider>
    );

}

export { AppContext, AppProvider };