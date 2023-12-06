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
            <th>Availability</th>
            <th>Actions</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {
            rows.map((row, idx) => {
              return <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{row.username}</td>
                <td>{row.password}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span className={`label label-${row.availability}`}>{row.availability}</span>
                </td>
                <td>
                  <span className='actions'>
                    <BsFillTrashFill className='delete-btn' onClick={() => deleteRow(idx)} />
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