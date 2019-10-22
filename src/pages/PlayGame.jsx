import React, { Component } from 'react';
import { Button, Icon, Modal } from "antd";
import { withRouter } from "react-router-dom";
import classNames from 'classnames';
import ChessBoard from "../components/ChessBoard";
import styles from './PlayGame.module.css';
import { directionObj } from '../help/dataMap';
import { checkIsMoveAble } from '../help/checkValue';

class PlayGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderArray: [1, 2 , 3, 4, 5, 6, 7, 8, 0],
      zeroIndex: 8,
    }
  }
  componentDidMount() {
    window.document.onkeyup = this.onKeyBoardEvent;
    this.handleGetRandomArray();
  }

  // 数组洗牌
  handleGetRandomArray = () => {
    const { orderArray } = this.state;
    let isValidArray = false;
    while(!isValidArray) {
      for (let i = 0; i < orderArray.length - 1; i++) {
        let index = Math.floor(Math.random() * (orderArray.length - 1));
        let temp = orderArray[i];
        orderArray[i] = orderArray[index];
        orderArray[index] = temp;
      }
      isValidArray = this.handleCheckRandomArray(orderArray);
    }
    this.setState({
      orderArray,
    })
  };

  // 检查是否为有效数组，即判断随机后的数组的逆序数是否为偶数
  handleCheckRandomArray = (array) => {
    let reverseOrder = 0;
    array.forEach((item, index) => {
      if (index < array.length - 1) {
        for (let n = index + 1; n <= array.length - 1; n +=1) {
          if (item > array[n]) reverseOrder += 1;
        }
      }
    });
    return !(reverseOrder % 2);
  };

  onKeyBoardEvent = async (event) => {
    const { zeroIndex } = this.state;
    let keyCode = event.which || event.keyCode;
    if (directionObj[keyCode] && checkIsMoveAble(directionObj[keyCode], zeroIndex)) {
      await this.handleMoveNumber(directionObj[keyCode]);
      let result = this.handleCheckResult();
      if (result) {
        Modal.success({
          title: 'success ! ! ! ',
          onOk() {},
          okText: '确定',
          okType: 'danger',
        });
      }
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

  // 检查结果是否正确
  handleCheckResult = () => {
    const { orderArray } = this.state;
    let targetArr = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    return  JSON.stringify(targetArr) === JSON.stringify(orderArray);
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
          <Button className={classNames(styles.button, styles.restart)} onClick={this.handleGetRandomArray}>重新开始</Button>
        </div>
        <ChessBoard arr={orderArray} />
      </div>
    )
  }
}

export default withRouter(PlayGame);