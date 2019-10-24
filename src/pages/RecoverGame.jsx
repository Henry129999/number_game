import React, { Component } from 'react';
import { Button, Icon } from "antd";
import { withRouter } from "react-router-dom";
import classNames from 'classnames';
import ChessBoard from "../components/ChessBoard";
import styles from './PlayGame.module.css';
import { directionObj, availableDirectionObj } from '../help/dataMap';
import { checkIsMoveAble } from '../help/checkValue';
import { sleep } from '../help/common';

class RecoverGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderArray: [1, 2 , 3, 4, 5, 6, 7, 8, 0],
      zeroIndex: 8,
    }
  }
  componentDidMount() {
    window.document.onkeyup = this.onKeyBoardEvent;
  }

  onKeyBoardEvent = async (event) => {
    const { zeroIndex } = this.state;
    let keyCode = event.which || event.keyCode;
    if (directionObj[keyCode] && checkIsMoveAble(directionObj[keyCode], zeroIndex)) {
      this.handleMoveNumber(directionObj[keyCode]);
    }
  };

  handleMoveNumber = (direction) => {
    const { orderArray, zeroIndex } = this.state;
    let tempValue;
    let moveDistance = 0;
    switch (direction) {
      case 'left':
        moveDistance = -1;
        break;
      case 'up':
        moveDistance = -3;
        break;
      case 'right':
        moveDistance = 1;
        break;
      case 'down':
        moveDistance = 3;
        break;
      default: break;
    }
    tempValue = orderArray[zeroIndex];
    orderArray[zeroIndex] = orderArray[zeroIndex + moveDistance];
    orderArray[zeroIndex + moveDistance] = tempValue;
    this.setState({
      orderArray,
      zeroIndex: zeroIndex + moveDistance,
    })
  };

  getChildNode = (currentNode) => {
    let keyIndex = currentNode.indexOf(0);
    let tempValue;
    let result = [];
    availableDirectionObj[keyIndex].forEach(item => {
      let nodeTemp = JSON.parse(JSON.stringify(currentNode));
      tempValue = nodeTemp[keyIndex];
      nodeTemp[keyIndex] = nodeTemp[keyIndex + item];
      nodeTemp[keyIndex + item] = tempValue;
      result.push(nodeTemp);
    });
    return result;
  };

  // 找出恢复拼图的路径
  handleFindRecoverPuzzlePath = () => {
    const { orderArray } = this.state;
    const targetStr = '123456780';
    let isFind = false;
    let nodeQueue = []; // 存储所有路径的栈，采用广度优化遍历
    let prevNodeStack = {}; // 存储父子节点之间的相互关系
    let allTestedNode = {}; // 存储所有走过的节点
    nodeQueue.push(orderArray);
    allTestedNode[orderArray.toString().split(',').join('')] = orderArray;
    while(!isFind) {
      let currentNode = nodeQueue.shift();
      let currentNodeStr = currentNode.toString().split(',').join('');
      if (currentNodeStr === targetStr) {
        this.handleRecoverPuzzle(prevNodeStack);
        isFind = true;
      } else {
        let childNodeArr = this.getChildNode(currentNode);
        childNodeArr.forEach(item => {
          let itemStr = item.toString().split(',').join('');
          if (!allTestedNode[itemStr]) {
            allTestedNode[itemStr] = item;
            prevNodeStack[itemStr] = currentNode;
            nodeQueue.push(item);
          }
        })
      }
    }
  };

  // 根据路径恢复拼图
  handleRecoverPuzzle = async (prevNodeStack) => {
    let backtrackStr = '123456780';
    let moveNodeArr = [];
    moveNodeArr.push([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    while (prevNodeStack[backtrackStr]) {
      moveNodeArr.unshift(prevNodeStack[backtrackStr]);
      backtrackStr = prevNodeStack[backtrackStr].toString().split(',').join('');
    }
    moveNodeArr.shift();
    for (let n = 0; n <= moveNodeArr.length - 1; n += 1) {
      await sleep(300);
      this.setState({
        orderArray: moveNodeArr[n],
      });
    }
    this.setState({
      zeroIndex: 8,
    })
  };

  handleLinkToHome = () => {
    const { history } = this.props;
    history.push('./');
  };

  render() {
    const { orderArray } = this.state;

    return(
      <div className={styles.container}>
        <div className={styles.header}>
          <Button className={styles.button} onClick={this.handleLinkToHome}>
            <Icon type="left" />返回
          </Button>
          <Button
            className={classNames(styles.button, styles.restart)}
            onClick={this.handleFindRecoverPuzzlePath}
          >
            复原拼图
          </Button>
        </div>
        <ChessBoard arr={orderArray} />
      </div>
    )
  }
}

export default withRouter(RecoverGame);