import React from 'react';
import classNames from 'classnames';
import styles from "./ChessBoard.module.css";

export default function (props) {
  const { arr } = props;
  return (
    <div className={styles.board}>
      {arr.map(item => (
        <div
          className={item === 0
            ? classNames(styles.block, styles.whiteBg)
            : styles.block}
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  )
}