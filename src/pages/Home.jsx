import React from 'react';
import { Button } from 'antd';
import { withRouter } from "react-router-dom";

function Home (props) {
  function handleLinkTo(type) {
    const { history } = props;
    history.push(`./${type}`);
  }

  return (
    <div className="container">
      <Button
        type="primary"
        className="button"
        onClick={() => handleLinkTo('playGame')}
      >
        开始游戏
      </Button>
      <Button
        type="primary"
        className="button"
        onClick={() => handleLinkTo('recoverGame')}
      >
        最佳路径
      </Button>
    </div>
  )
}

export default withRouter(Home);
