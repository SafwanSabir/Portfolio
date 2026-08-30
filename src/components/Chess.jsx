import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import chessIcon from '../assets/chess.png'
import { Chessboard } from 'react-chessboard'
import { Chess as ChessJS } from 'chess.js'
import '../css/Chess.css'

function Chess() {
  const { 
    themeDragBar,
    ChessExpand, setChessExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

  const [game, setGame] = useState(new ChessJS());

  function makeRandomMove(currentFEN) {
    const tempGame = new ChessJS(currentFEN);
    const possibleMoves = tempGame.moves();
    if (tempGame.isGameOver() || tempGame.isDraw() || possibleMoves.length === 0) return; 
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    tempGame.move(possibleMoves[randomIndex]);
    setGame(new ChessJS(tempGame.fen()));
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = new ChessJS(game.fen());
    let result = null;
    try {
      result = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
    } catch(e) {
      result = null;
    }

    if (result === null) return false;
    
    setGame(new ChessJS(gameCopy.fen()));
    const updatedFEN = gameCopy.fen();
    setTimeout(() => makeRandomMove(updatedFEN), 300);
    return true;
  }

  function handleDrag(event, data) {
    setChessExpand(prev => ({
      ...prev, x: data.x, y: data.y
    }))
  }

  function handleDragStop(event, data) {
    setChessExpand(prev => ({
      ...prev, x: data.x, y: data.y
    }))
  }

  function handleExpandStateToggle() {
    setChessExpand(prevState => ({
      ...prevState, expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setChessExpand(prevState => ({
            ...prevState, expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
  }

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-chess'}
        grid={[1, 1]}
        scale={1}
        disabled={ChessExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 10 : 250,
          y: window.innerWidth <= 500 ? 110 : 150,
        }}
        onDrag={(event, data) => handleDrag(event, data)}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Chess')}
      >
        <div className='folder_folder-chess' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Chess');
            }}
            style={{ 
              ...(ChessExpand.expand ? inlineStyleExpand('Chess') : inlineStyle('Chess')),
              left: `${ChessExpand.x}px`,
              top: `${ChessExpand.y}px`
            }}>
          <div className="folder_dragbar-chess"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ChessExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname-chess">
              <img src={chessIcon} alt="chess" />
              <span>Chess</span>
            </div>
            <div className="folder_barbtn-chess">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setChessExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Chess') 
              } : undefined }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setChessExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Chess')
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-chess'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-chess ${ChessExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ChessExpand.expand ? <div className="expand_2-chess"></div> : null}
              </div>
              <div>
                <p className='x-chess'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Chess')
                 }: undefined}
                onTouchEnd={() => {
                  deleteTap('Chess')
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="folder_content-chess"
            style={ChessExpand.expand ? { height: 'calc(100svh - 72px)'} : {}}
          >
            {ChessExpand.show && (
              <div className="chess-container">
                <div className="chess-board-wrapper">
                    <Chessboard position={game.fen()} onPieceDrop={onDrop} />
                </div>
                <div className="chess-controls">
                    <button onClick={() => setGame(new ChessJS())} className="btn-retro">Reset Game</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </>
  )
}

export default Chess
