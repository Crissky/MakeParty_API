const ValidationContract = require('./fluent-validator');

const PASSWORD_MIN_LEN = 6;
const CNPJ_MIN_LEN = 14;
const CPF_MIN_LEN = 11;
const NAME_MIN_LEN = 3;
const TITLE_MIN_LEN = 3;
const TYPE_MIN_LEN = 3;

let contract = new ValidationContract();

function ValidatorFields() {
    contract = new ValidationContract();
}

ValidatorFields.prototype.cnpj = (cnpj) => {
    console.log("ValidatorFields: cnpj");
    contract.hasMinLen(cnpj, CNPJ_MIN_LEN, "CNPJ deve ter no mínimo " + CNPJ_MIN_LEN + " dígitos.");
}

ValidatorFields.prototype.cpf = (cpf) => {
    console.log("ValidatorFields: cpf");
    contract.hasMinLen(cpf, CPF_MIN_LEN, "CPF deve ter no mínimo " + CPF_MIN_LEN + " dígitos.");
}

ValidatorFields.prototype.email = (email) => {
    console.log("ValidatorFields: e-mail");
    contract.isEmail(email, "E-mail inválido.");
}

ValidatorFields.prototype.password = (password) => {
    console.log("ValidatorFields: password");
    contract.hasMinLen(password, PASSWORD_MIN_LEN, "Senha deve ter no mínimo " + PASSWORD_MIN_LEN + " caracteres.");
}

ValidatorFields.prototype.name = (name) => {
    console.log("ValidatorFields: name");
    contract.hasMinLen(name, NAME_MIN_LEN, "Nome deve ter no mínimo " + NAME_MIN_LEN + " caracteres.");
}

ValidatorFields.prototype.title = (title) => {
    console.log("ValidatorFields: title");
    contract.hasMinLen(title, TITLE_MIN_LEN, "Título deve ter no mínimo " + TITLE_MIN_LEN + " caracteres.");
}

ValidatorFields.prototype.type = (type) => {
    console.log("ValidatorFields: title");
    contract.hasMinLen(type, TYPE_MIN_LEN, "Tipo deve ter no mínimo " + TYPE_MIN_LEN + " caracteres.");
}

ValidatorFields.prototype.errors = () => { 
    return contract.errors(); 
}

ValidatorFields.prototype.clear = () => {
    contract.clear();
}

ValidatorFields.prototype.isValid = () => {
    return contract.isValid();
}


module.exports = ValidatorFields;