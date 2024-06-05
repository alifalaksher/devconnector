import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { delExp } from '../../actions/profile'
import Moment from 'react-moment'

const Experiences = ({experiences, delExp}) => {
    const expArr = experiences.map(expGet => (
        <tr key={expGet._id}>
        <td>{expGet.company}</td>
        <td className="hide-sm">{expGet.title}</td>
        <td className="hide-sm"><Moment format='YYYY-MM-DD'>{expGet.from}</Moment> - {expGet.to === null ? ('Now') : (<Moment format='YYYY-MM-DD'>{expGet.from}</Moment>)}</td>
        <td>
          <button onClick={()=> delExp(expGet._id)} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ))
  return (
    <Fragment>
        <h2 className="my-2">Experience Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Years</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{expArr}</tbody>
          </table>
    </Fragment>
  )
}

Experiences.propTypes = {
    experiences: PropTypes.array.isRequired,
    delExp: PropTypes.func.isRequired
}

export default connect(null,{delExp})(Experiences)