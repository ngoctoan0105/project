import { useEffect, useState } from "react";
import { getUser } from "../../../apis/users";


const ModalView = ({ id }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    if (id) {
      getUser(id).then((res) => {
        setData(res.data)
      }).catch((error) => { console.log(error); })
    }
  }, [id])

  return (
    <div>
      <div className="modal fade" id="modal-view-user"  data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <div className="modal-body">
              <div className='mb-3'>
                name: {data.name}
              </div>
            </div>
            <div className="modal-body">
              <div className='mb-3'>
                email: {data.email}
              </div>
            </div>
            <div className="modal-body">
              <div className='mb-3'>
                sdt: {data.sdt}
              </div>
            </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
           
            </div>
          </div>
        </div>
      </div>


    
    </div>
  )

}
export default ModalView;  