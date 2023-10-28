/* eslint-disable react/prop-types */

import avatar from '../../../assets/images/Avatar.svg'

export function HeadProfile({
  userObj
}) {
  
  return (
    <div className="todo__profile">
      <div className="profile__picture">
        {
          userObj.displayName !== null ?
          <img src={userObj.photoURL} alt={userObj.displayName} /> :
          <img src={avatar} alt='Usuario de Prueba' />
        }
      </div>
      <div className="profile__name">
        {
          userObj.displayName !== null ?
          userObj.displayName :
          'Usuario de Prueba'
        }
      </div>
    </div>
  )
}