import React from 'react'
import './Table.css'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'

const Table = ({ rows, deleteRow, editRow, sendEmail }) => {
  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Username</th>
            <th>Password</th>
            <th>IP Address</th>
            <th>Availability</th>
            <th>Actions</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {
            rows.map((row, idx) => {
              return <tr key={idx}>
                <td>{row.id}</td>
                <td>{row.user_id}</td>
                <td>{row.password}</td>
                <td>{row.password}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span className={`label label-${row.is_available=="1"?"yes":"no"}`}>{row.is_available=="1"?"yes":"no"}</span></td>
                <td>
                  <span className='actions'>
                    <BsFillTrashFill className='delete-btn' onClick={() => deleteRow(row.id)} />
                    <BsFillPencilFill className='update-btn' onClick={() => editRow(idx)} />
                  </span>
                </td>
                <td>
                  <button type='button' className='send-email' onClick={() => sendEmail(idx)}>Send</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table