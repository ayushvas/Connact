import "./rightBar.scss"

const RightBar = () => {
  return (
    <div className='rightBar'>
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/16614544/pexels-photo-16614544/free-photo-of-cat-sleeping-on-table.jpeg" alt=""/>
              <span>Serena P</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/16614544/pexels-photo-16614544/free-photo-of-cat-sleeping-on-table.jpeg" alt=""/>
              <p>
              <span>Serena P</span><span> changed their cover photo</span>
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online friends</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/16614544/pexels-photo-16614544/free-photo-of-cat-sleeping-on-table.jpeg" alt=""/>
              <div className="online"/>
              <span>Serena P</span>
             
            </div>
   
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar