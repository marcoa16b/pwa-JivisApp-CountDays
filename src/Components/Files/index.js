import { jsPDF } from 'jsPDF';

function ReadFile(file, addUsersList) {
    //let myFile = file;
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        let fileContentArray = reader.result.split(/\r\n|\n/);
        console.log(reader.result);
        console.log('Array ---->');
        console.log(fileContentArray);
        addUsersList(fileContentArray);
    };

    reader.onerror = function() {
        console.log(reader.error);
    };
}

const GenerateReport = (listUs, nameUs) => {

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

    // variables
    const list = listUs;
    const name = nameUs;

    const usuario = list.find(user => name.includes(user.name));
    const userName = usuario.name;
    const userDays = usuario.days;
    const userObs = usuario.observations;
    let listaTxtObserv = [];
    let lisObs = [];
    for (var i = 0; i < userObs.length; i++ ){
        let observacion = userObs[i]
        const op = observacion.operation;
        let oper = '';
        if (op === "suma") {
            oper = 'sumaron';
        } else {
            oper = 'restaron';
        }
        listaTxtObserv.push(
            `El dia ${observacion.date} se ${oper} ${observacion.days} dias por el motivo:`
        );
    }
    // observation
    for (let n = 0; n < userObs.length; n++ ){
        let observacion = userObs[n];
        lisObs.push(observacion.observation);

    }

    console.log(userName)
    console.log(listaTxtObserv)
    const fecha = getActualDate();
    const directory = `reporte-${userName}-${fecha}.pdf`;
    
    // tamaño de la hoja = 210x297
    var doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(20, 20, 'Reporte de usuario');

    doc.setFontSize(12);
    doc.text(20, 30, `Fecha de emision del reporte: ${fecha}`);
    doc.text(20, 35, `El usuario ${userName} tiene actualmente ${userDays} dias`);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
    let posY = 55;
    for (let i=0; i<listaTxtObserv.length; i++){
        posY += 5;
        if (posY <= 277){
            doc.text(20, posY, listaTxtObserv[i]);
            posY += 5;
            doc.text(20, posY, lisObs[i]);
            posY += 5;
        } else {
            doc.addPage();
            posY = 20;
            doc.text(20, posY, listaTxtObserv[i]);
            posY += 5;
            doc.text(20, posY, lisObs[i]);
            posY += 5;
        }
    }
    doc.save(directory);
}

export {ReadFile, GenerateReport};