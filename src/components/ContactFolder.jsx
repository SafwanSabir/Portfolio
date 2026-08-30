import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import mail from '../assets/mail.png'
import github from '../assets/github.png'
import '../css/ContactFolder.css'

function ContactFolder() {
  const { 
    themeDragBar,
    ContactExpand, setContactExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

  function handleDragStop(event, data) {
    const positionX = data.x 
    const positionY = data.y
    setContactExpand(prev => ({
      ...prev, x: positionX, y: positionY
    }))
  }

  function handleExpandStateToggle() {
    setContactExpand(prevState => ({
      ...prevState, expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setContactExpand(prevState => ({
            ...prevState, expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
  }

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-contact'}
        grid={[1, 1]}
        scale={1}
        disabled={ContactExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 15 : 120,
          y: window.innerWidth <= 500 ? 120 : 100,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Contact')}
      >
        <div className='folder_folder-contact' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Contact');
            }}
            style={ ContactExpand.expand ? inlineStyleExpand('Contact') : inlineStyle('Contact')}>
          <div className="folder_dragbar-contact"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ContactExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname-contact">
              <img src={mail} alt="contact" />
              <span>Contact</span>
            </div>
            <div className="folder_barbtn-contact">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setContactExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Contact') 
              } : undefined }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setContactExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Contact')
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-contact'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-contact ${ContactExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ContactExpand.expand ? <div className="expand_2-contact"></div> : null}
              </div>
              <div>
                <p className='x-contact'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Contact')
                 }: undefined}
                onTouchEnd={() => {
                  deleteTap('Contact')
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="folder_content-contact"
            style={ContactExpand.expand ? { height: 'calc(100svh - 72px)'} : {}}
          >
            {ContactExpand.show && (
              <div className="contact-container">
                <h2 className="contact-title">Contact Me</h2>
                <div className="contact-list">
                    <a href="https://github.com/SafwanSabir" target="_blank" rel="noreferrer" className="contact-item">
                        <img src={github} alt="GitHub" /> GitHub
                    </a>
                    <a href="https://linkedin.com/in/safwansabir" target="_blank" rel="noreferrer" className="contact-item">
                        <img src={mail} alt="LinkedIn" /> LinkedIn
                    </a>
                    <a href="mailto:safwansabir78@gmail.com" target="_blank" rel="noreferrer" className="contact-item">
                        <img src={mail} alt="Email" /> safwansabir78@gmail.com
                    </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </>
  )
}

export default ContactFolder
