import UseContext from '../Context';
import { useContext, useRef } from "react";
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import Games from '../assets/regFolder.png';
import '../css/GamesFolder.css';

function GamesFolder() {
  const iconRefs = useRef([]);

  const {
    setCurrentRightClickFolder,
    refBeingClicked,
    handleMobileLongPress,
    setRightClickIcon,
    setIconBeingRightClicked,
    timerRef,
    iconContainerSize,
    iconImgSize,
    iconTextSize,
    iconScreenSize,
    dragging,
    key,
    setDropTargetFolder,
    dropTargetFolder,
    handleDrop,
    handleOnDrag,
    GamesFolderRef,
    imageMapping,
    desktopIcon,
    themeDragBar,
    GamesExpand,
    setGamesExpand,
    lastTapTime,
    setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleShow,
    handleShowMobile,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    iconFocusIcon,
    deleteTap,
  } = useContext(UseContext);

  function handleDragStop(event, data) {
    const { x, y } = data;
    setGamesExpand((prev) => ({
      ...prev,
      x,
      y,
    }));
  }

  function handleExpandStateToggle() {
    setGamesExpand((prevState) => ({
      ...prevState,
      expand: !prevState.expand,
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      setGamesExpand((prevState) => ({
        ...prevState,
        expand: !prevState.expand,
      }));
    }
    setLastTapTime(now);
  }

  return (
    <Draggable
      axis="both"
      handle=".folder_dragbar-Games"
      grid={[1, 1]}
      scale={1}
      disabled={GamesExpand.expand}
      bounds={{ top: 0 }}
      defaultPosition={{
        x: window.innerWidth <= 500 ? 20 : 40,
        y: window.innerWidth <= 500 ? 40 : 160,
      }}
      onStop={handleDragStop}
      onStart={() => handleSetFocusItemTrue('Games')}
    >
      <div
        onContextMenu={() => setCurrentRightClickFolder('Games')}
        onTouchStart={() => setCurrentRightClickFolder('Games')}
        className="folder_folder-Games"
        ref={GamesFolderRef}
        onClick={(e) => {
          e.stopPropagation();
          handleSetFocusItemTrue('Games');
        }}
        style={{
          ...(
            GamesExpand.expand
              ? inlineStyleExpand('Games')
              : inlineStyle('Games')
          ),
          overflow: dragging ? '' : 'hidden',
        }}
      >
        <div
          className="folder_dragbar-Games"
          onDoubleClick={handleExpandStateToggle}
          onTouchStart={handleExpandStateToggleMobile}
          style={{ background: GamesExpand.focusItem ? themeDragBar : '#757579' }}
        >
          <div className="folder_barname-Games">
            <img src={Games} alt="Games" />
            <span>Games</span>
          </div>
          <div className="folder_barbtn-Games">
            <div
              onClick={!isTouchDevice ? (e) => {
                e.stopPropagation();
                setGamesExpand((prev) => ({ ...prev, hide: true, focusItem: false }));
                StyleHide('Games');
              } : undefined}
              onTouchEnd={(e) => {
                e.stopPropagation();
                setGamesExpand((prev) => ({ ...prev, hide: true, focusItem: false }));
                StyleHide('Games');
              }}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <p className="dash-Games"></p>
            </div>
            <div
              onClick={!isTouchDevice ? handleExpandStateToggle : undefined}
              onTouchEnd={handleExpandStateToggle}
            >
              <motion.div className={`expand-Games ${GamesExpand.expand ? 'full' : ''}`}></motion.div>
              {GamesExpand.expand && <div className="expand_2-Games"></div>}
            </div>
            <div>
              <p
                className="x-Games"
                onClick={!isTouchDevice ? () => deleteTap('Games') : undefined}
                onTouchEnd={() => deleteTap('Games')}
              >
                ×
              </p>
            </div>
          </div>
        </div>

        <div className="file_edit_container-Games">
          <p>File<span style={{ left: '-23px' }}>_</span></p>
          <p>Edit<span style={{ left: '-24px' }}>_</span></p>
          <p>View<span style={{ left: '-32px' }}>_</span></p>
          <p>Help<span style={{ left: '-30px' }}>_</span></p>
        </div>

        <div
          className="folder_content-Games"
          onClick={() => iconFocusIcon('')}
          style={{
            height: GamesExpand.expand ? 'calc(100svh - 122px)' : '',
            overflow: dragging ? '' : 'hidden',
          }}
        >
          <div className="parent_container-Games" key={key}>
            <div
              className="item_container-Games"
              style={{ position: dragging ? 'absolute' : '' }}
              onClick={(e) => {
                e.stopPropagation() 
                iconFocusIcon('');
                handleSetFocusItemTrue('Games');
              }}
            >
              {desktopIcon.filter((icon) => icon.folderId === 'Games').map((icon) => (
                <Draggable
                  axis="both"
                  handle=".icon"
                  grid={[10, 10]}
                  scale={1}
                  bounds={false}
                  onStart={() => {
                    setDropTargetFolder('');
                    handleSetFocusItemTrue('Games');
                  }}
                  onDrag={handleOnDrag(icon.name, iconRefs.current[icon.name])}
                  onStop={(e) => {
                    handleDrop(e, icon.name, dropTargetFolder, icon.folderId)
                    clearTimeout(timerRef.current)
                  }}
                  key={icon.name}
                >
                  <div
                    className="icon"
                    style={iconContainerSize(iconScreenSize)}
                    ref={(el) => (iconRefs.current[icon.name] = el)}
                    onContextMenu={() => {
                      setRightClickIcon(true);
                      iconFocusIcon(icon.name);
                      setIconBeingRightClicked(icon);
                      refBeingClicked.current = iconRefs.current[icon.name]
                    }}
                    onDoubleClick={() => handleShow(icon.name)}
                    onClick={!isTouchDevice ? (e) => {
                      iconFocusIcon(icon.name);
                      e.stopPropagation();
                    } : undefined}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleShowMobile(icon.name);
                      iconFocusIcon(icon.name);
                      handleMobileLongPress(e, icon);
                      refBeingClicked.current = iconRefs.current[icon.name]
                    }}
                  >
                    <img
                      src={imageMapping(icon.pic)}
                      alt="#"
                      className={icon.focus ? 'img_focus' : ''}
                      style={iconImgSize(iconScreenSize)}
                    />
                    <p
                      className={icon.focus ? 'p_focus' : 'p_normal'}
                      style={iconTextSize(iconScreenSize)}
                    >
                      {icon.name}
                    </p>
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        </div>

        <div className="btm_bar_container-Games">
          <div className="object_bar-Games">
            <p>
              {desktopIcon.filter((icon) => icon.folderId === 'Games').some((icon) => icon.focus)
                ? '1 object(s) selected'
                : `${desktopIcon.filter((icon) => icon.folderId === 'Games').length} object(s)`}
            </p>
          </div>
          <div className="size_bar-Games">
            <p>
              {(() => {
                const filteredIcons = desktopIcon.filter((icon) => icon.folderId === 'Games');
                const totalSize = filteredIcons.reduce((total, icon) => total + icon.size, 0);
                return filteredIcons.every((icon) => !icon.focus)
                  ? totalSize
                  : filteredIcons.filter((icon) => icon.focus).reduce((sum, icon) => sum + icon.size, 0);
              })()} KB
            </p>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default GamesFolder;
