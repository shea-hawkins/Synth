import React from 'react';
import Game from '../../../game/Game.js';
import GameRendererView from './GameRendererView.js';
import GameOverModal from '../stateless/GameOverModal.js';
import ScoreView from '../stateless/ScoreView.js';
import SongQueueView from '../stateless/SongQueueView.js';
import { connection } from './GameModel';

class GameView extends React.Component {
  componentDidMount() {
    // Here we will create the new game instance
    // and bind that game instance to the dom and pass the
    // current song.
    var game = new Game('game', this.props.params.fileName);
    game.addEventListener('updateTime', (newState, time) => {
      this.props.updateTime(time);
    });
    game.addEventListener('decrementLife', (newState) => {
      this.props.updateLives(newState.lives);
    });
    game.addEventListener('gameOver', (newState) => {
      this.props.updateGameState(newState.stateName);
    });
  }
  // add gameover modal below at 31.5 
  // with property stateName = this.props.stateName 
  render() {
    return (
      <div className="game-view">
        <ScoreView time={this.props.elapsed} duration={this.props.duration} lives={this.props.lives} stateName={this.props.stateName}/>
        <GameRendererView />
        <SongQueueView fileName={this.props.params.fileName} title={this.props.location.search}/>
        <SongQueueView fileName={this.props.params.fileName}/>
        <GameOverModal status={this.props.stateName} fileName={this.props.params.fileName}/>
      </div>
    );
  }
}

export default connection(GameView);
