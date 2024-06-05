import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { delEdu } from '../../actions/profile'
import Moment from 'react-moment'

const Educations = ({education, delEdu}) => {
  console.log(education);
    const edArr = education.map(edGet => (
        <tr key={edGet._id}>
        <td>{edGet.institute}</td>
        <td className="hide-sm">{edGet.degree}</td>
        <td className="hide-sm"><Moment format='YYYY-MM-DD'>{edGet.from}</Moment> - {edGet.to === null ? ('Now') : (<Moment format='YYYY-MM-DD'>{edGet.from}</Moment>)}</td>
        <td>
          <button onClick={ () => delEdu(edGet._id)} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ))
  return (
    <Fragment>
        <h2 className="my-2">Education Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th className="hide-sm">Degree</th>
                <th className="hide-sm">Years</th>
                <th />
              </tr>
            </thead>
            <tbody>
             {edArr}
            </tbody>
          </table>
          <div className="my-2">
            <button className="btn btn-danger">
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
    </Fragment>
  )
}

 
Educations.propTypes = {
    education: PropTypes.array.isRequired,
    delEdu: PropTypes.func.isRequired
}

export default connect(null,{delEdu})(Educations)