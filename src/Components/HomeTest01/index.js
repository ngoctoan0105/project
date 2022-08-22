import './style.css'

import { useEffect, useState } from 'react';
import HomeTest02 from '../HomeTest02';
import { getUsers, getUser, createUser, editUsers, deletetUsers } from '../../apis/users'
import ModalView from './ModalView';


function MyForm() {
  const [selectedid, setSelectedid] = useState()
  const ALO = { ten: '', email: '', matkhau: '' }
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState(ALO)
  const [resultList, setResultList] = useState([])


  useEffect(() => {
    fetchData()
  }, [])

  const validate = (list, formData) => {
    if (formData.ten === '' || formData.email === '' || formData.matkhau === '') {
      return false
    }
    //create
    if (!formData.id) {
      const item = list.find((item) => {
        return item.ten === formData.ten || item.email === formData.email || item.matkhau === formData.matkhau

      })
      return item ? false : true
    }
    //edit
    if (formData.id) {
      const item = list.find(item => {
        return item.id !== formData.id && (item.ten === formData.ten || item.email === formData.email || item.matkhau === formData.matkhau)

      })
      return item ? false : true
    }
  }
  useEffect(() => {
    if (search) {
      const newrsl = list.filter((item) => {
        return item.ten.includes(search) || item.email.includes(search) || item.matkhau.includes(search)
      })
      setResultList(newrsl)
    }
    else {
      setResultList(list)
    }

  }, [search, list])

  const fetchData = () => {
    getUsers().then((response) => {
      setList(response.data)
    }).catch((error) => {
      console.log(error);
    })

  }

  const onChange2 = (e) => {
    const value = e.target.value
    setSearch(value)
  }
  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({
      ...formData,
      [name]: value
    })

  }
  const onSubmit = () => {
    const isvalidated = validate(list, formData)
    if (isvalidated) {
      if (!formData.id) {
        createUser(formData).then((res) => {
          fetchData()
          setFormData(ALO)
        }).catch((error) => { console.log(error); })
      }
      if (formData.id) {
        editUsers(formData.id, formData).then((res) => {
          fetchData()
          setFormData(ALO)
        }).catch((error) => { console.log(error) })

      }
      const element = document.querySelector('#exampleModal')
      const modal = window.bootstrap.Modal.getInstance(element)
      modal.hide()
    }
  }
  const onCreate = () => {
    setFormData({})

    const element = document.querySelector('#exampleModal')
    const modal = window.bootstrap.Modal.getOrCreateInstance(element)
    modal.show()
  }
  const onview = (id) => {
    setSelectedid(id)


    const element = document.querySelector('#modal-view-user')
    console.log(element);
    const modal = window.bootstrap.Modal.getOrCreateInstance(element);
    modal.show()
  }
  const onEdit = (data) => {
    setFormData(data)

    const element = document.querySelector('#exampleModal')
    const modal = window.bootstrap.Modal.getOrCreateInstance(element);
    modal.show()
  }
  const onDelete = (id) => {
    const newItem = list.filter((a) => {
      return a.id !== id
    })
    setList(newItem)
  }
  return (
    <div >
      <div className='container-fluid header'>
        <a href='#' >React</a>
      </div>

      <div className='container'>


        <div><nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <HomeTest02 onChange={onChange} submit={onSubmit} Create={onCreate} formData={formData} />

            <form className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control rounded"
                value={search}
                onChange={onChange2}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
            </form>
          </div>
        </nav></div>


        <div>

          {
            resultList.map((fd) => {
              return (<div>
                <div key={fd.id} className='ftt'>

                  <div > {fd.createdAt}</div>
                  <div > Name:{fd.name}</div>
                  <div > Email:{fd.email}</div>
                  <div className='button-form'>
                    <button onClick={() => { onview(fd.id) }} >Onview</button>
                    <button onClick={() => { onEdit(fd) }}>edit</button>
                    <button onClick={() => { onDelete(fd.id) }} >Delete</button>
                  </div>
                </div>
              </div>)
            })
          }</div>
        <ModalView id={selectedid}></ModalView>
      </div>


    </div>


  )
}
export default MyForm;

