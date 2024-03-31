import React from 'react'

const NoteItem = (props) => {
    const { note } = props
    return (
        <div className='col-sm-3'>
            <div className="card my-3" style={{"width":"18rem"}}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.name}</h5>
                    <i className="fa-regular fa-trash-can mx-2"></i>
                    <i className="fa-regular fa-pen-to-square mx-2"></i>
                    </div>
                    <p className="card-text">{note.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam maxime natus officiis quam, nesciunt ex veritatis itaque nobis, soluta rem perspiciatis? Blanditiis eum, corporis aliquam sapiente sed qui officia reprehenderit, dolorum accusamus labore eligendi?</p>
                </div>
            </div>
        </div>

    )
}

export default NoteItem