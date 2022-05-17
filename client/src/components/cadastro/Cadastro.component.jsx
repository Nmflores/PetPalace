import { React, useState, Component } from 'react'
import Select from 'react-select'
import Axios from 'axios'

{/*
username,
      firstName,
      secondName,
      email,
      userGender,
      password,
      cpf,
      address,
      addressNbr,
      district,
      cep,
      state
*/}

export default function Cadastro() {
  const [usernameIpt, setUsernameIpt] = useState('')
  const [fNameIpt, setFnameIpt] = useState('')
  const [sNameIpt, setSnameIpt] = useState('')
  const [emailIpt, setEmailIpt] = useState('')
  const [genderIpt, setGenderIpt] = useState('')
  const [passwordIpt, setPasswordIpt] = useState('')
  const [cpfIpt, setCpfIpt] = useState('')
  const [addressIpt, setAddressIpt] = useState('')
  const [addressNbrIpt, setAddressNbrIpt] = useState('')
  const [districtIpt, setDistrictIpt] = useState('')
  const [cepIpt, setCepIpt] = useState('')
  const [stateIpt, setStateIpt] = useState('')

  const genderOptions = [
    { value: 'm', label: 'Masculino' },
    { value: 'f', label: 'Feminino' },
  ]

  const stateOptions = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ]

  console.log(`
  Username ${usernameIpt}
  FirstName: ${fNameIpt}
  SecondName: ${sNameIpt}
  Email: ${emailIpt}
  Gender: ${genderIpt}
  Password: ${passwordIpt}
  Cpf: ${cpfIpt}
  Address: ${addressIpt}
  AddressNbr: ${addressNbrIpt}
  District: ${districtIpt}
  Cep: ${cepIpt}
  State: ${stateIpt}
  `)

  const registerTo = async () => {
    Axios.post("http://localhost:8080/api/v1/register", {
      username: usernameIpt,
      firstName: fNameIpt,
      secondName: sNameIpt,
      email: emailIpt,
      userGender: genderIpt,
      password: passwordIpt,
      cpf: cpfIpt,
      address: addressIpt,
      addressNbr: addressNbrIpt,
      district: districtIpt,
      cep: cepIpt,
      state: stateIpt
    })
    .then(response => console.log(response.data.msg))
    .catch(error => console.log(error.response.data.msg))
  }


  return (
    <div className='cadastro-modal'>
      <h1>Cadastro</h1>

      <br />

      <label htmlFor="uname">Username</label>
      <input
        placeholder='Digite seu Username'
        name='uname'
        type="text"
        onChange={(e) => { setUsernameIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="fName">Primeiro Nome</label>
      <input
        placeholder='Digite seu primeiro nome'
        name='fName'
        type="text"
        onChange={(e) => { setFnameIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="sName">Segundo Nome</label>
      <input
        placeholder='Digite seu segundo nome'
        name='sName'
        type="text"
        onChange={(e) => { setSnameIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="sName">Email</label>
      <input
        placeholder='Digite seu email'
        name='email'
        type="email"
        onChange={(e) => { setEmailIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="genderSelect">Genero</label>
      <Select
        name="genderSelect"
        options={genderOptions}
        onChange={selectedOption  =>  setGenderIpt(selectedOption.value) }
      />

      <br />

      <label htmlFor="pass">Password</label>
      <input
        placeholder='Digite sua Senha'
        name='pass'
        type="password"
        onChange={(e) => { setPasswordIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="cpf">Cpf</label>
      <input
        placeholder='Digite seu Cpf'
        name='cpf'
        type="text"
        onChange={(e) => { setCpfIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="address">Endereço</label>
      <input
        placeholder='Digite seu Endereço/Rua'
        name='address'
        type="text"
        onChange={(e) => { setAddressIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="addressNbr">Numero do Endereço</label>
      <input
        placeholder='Digite seu numero residencial'
        name='addressNbr'
        type="number"
        onChange={(e) => { setAddressNbrIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="district">Bairro</label>
      <input
        placeholder='Digite seu Bairro'
        name='district'
        type="text"
        onChange={(e) => { setDistrictIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="cep">Cep</label>
      <input
        placeholder='Digite seu Cep'
        name='cep'
        type="text"
        onChange={(e) => { setCepIpt(e.target.value) }}
      />

      <br />

      <label htmlFor="stateSelect">Estado</label>
      <Select
        name="stateSelect"
        options={stateOptions}
        onChange={ selectedOption =>  setStateIpt(selectedOption.value) }
      />

      <br />

      <button onClick={registerTo}>Cadastrar</button>
    </div>
  )
}

