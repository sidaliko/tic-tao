import React from "react";
import "../../styles/grid.css";

import { iconComponents } from "../../shared/const";

function Grid({ number, firstValues, secondValues, playFirst }) {
  const [grid, setGrid] = React.useState(
    Array.from({ length: number }, () => Array(number).fill(""))
  );

  const [value, setValue] = React.useState(() => {
    return firstValues.firstUser === playFirst
      ? firstValues.firstAssignment
      : secondValues.secondAssignment;
  });

  const [oldValue, setOldValue] = React.useState(value);

  const [equal, setEqual] = React.useState(false);

  const [message, setMessage] = React.useState({ text: "", icon: null });

  const [fullGrid, setFullGrid] = React.useState(false);

  const handleIconComponent = (value, size) => {
    const IconComponent = iconComponents[value];

    return (
      <IconComponent
        color={
          value === firstValues.firstAssignment
            ? firstValues.firstColor
            : secondValues.secondColor
        }
        height={`${size}px`}
        width={`${size}px`}
      />
    );
  };

  const handleClick = (i, j) => {
    if (grid[i][j] !== "") {
      return null;
    }
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        return rowIndex === i && colIndex === j
          ? handleIconComponent(value, 40)
          : cell;
      })
    );
    setGrid(newGrid);
    const newValue =
      value === firstValues.firstAssignment
        ? secondValues.secondAssignment
        : firstValues.firstAssignment;
    setOldValue(value);
    setValue(newValue);
  };

  const allEqual = (arr) => {
    arr.every((v) => v !== "" && v.type === arr[0].type);
  };

  const handleWin = (grid) => {
    checkColValues(grid) && setEqual(true);
    checkLignValues(grid) && setEqual(true);
    checkMainDiagValues(grid) && setEqual(true);
    checkAntiMainDiagValues(grid) && setEqual(true);

    return equal;
  };

  function checkLignValues(grid) {
    let allSame = false;

    for (let i = 0; i < grid.length; i++) {
      const firstValue = grid[0][i];

      if (firstValue !== "") {
        for (let j = 1; j < grid.length; j++) {
          if (
            grid[j][i] !== "" &&
            grid[j][i].props.color === firstValue.props.color
          ) {
            allSame = true;
          } else {
            return (allSame = false);
          }
        }
      }

      if (allSame === true) {
        const newMessage = {
          text: `Congratulations, ${
            oldValue === firstValues.firstAssignment
              ? firstValues.firstUser
              : secondValues.secondUser
          } wins, having all cells of line ${i + 1} equal to`,
          icon: handleIconComponent(oldValue, 50), // This will store the JSX element
        };

        setMessage(newMessage);

        return true;
      }
    }
    return allSame;
  }

  function checkColValues(grid) {
    grid.map((item, coll) => {
      console.log(item.type);
      if (allEqual(item)) {
        setEqual(true);
        const newMessage = {
          text: `Congratulation, ${
            oldValue === firstValues.firstAssignment
              ? firstValues.firstUser
              : secondValues.secondUser
          } win, have all cells of column ${coll + 1} equal to`,
          icon: handleIconComponent(oldValue, 50), // This will store the JSX element
        };

        setMessage(newMessage);

        return equal;
      }
    });
  }

  function checkMainDiagValues(grid) {
    const gridLength = grid.length;

    let allSame = false;
    const firstValue = grid[0][0];

    if (firstValue !== "") {
      for (let j = 1; j < gridLength; j++) {
        if (
          grid[j][j] !== "" &&
          grid[j][j].props.color === firstValue.props.color
        ) {
          allSame = true;
        } else {
          allSame = false;
        }
        if (allSame === false) {
          return false;
        }
      }
    }
    if (allSame) {
      const newMessage = {
        text: `Congratulation, ${
          oldValue === firstValues.firstAssignment
            ? firstValues.firstUser
            : secondValues.secondUser
        } win, have all cells of diagonal equal to`,
        icon: handleIconComponent(oldValue, 50), // This will store the JSX element
      };

      setMessage(newMessage);
    }
    return allSame;
  }

  function checkAntiMainDiagValues(grid) {
    let k = grid.length - 1;
    const firstValue = grid[0][k];

    let allSame = false;
    let i = 1;
    if (firstValue !== "") {
      for (k; k > 0; k--) {
        if (
          grid[i][k - 1] !== "" &&
          grid[i][k - 1].props.color === firstValue.props.color
        ) {
          allSame = true;
        } else {
          allSame = false;
        }

        if (allSame === false) return false;
        i++;
      }
    }

    if (allSame) {
      const newMessage = {
        text: `Congratulation, ${
          oldValue === firstValues.firstAssignment
            ? firstValues.firstUser
            : secondValues.secondUser
        } win, have all cells of antidiagonal equal to `,
        icon: handleIconComponent(oldValue, 50), // This will store the JSX element
      };

      setMessage(newMessage);
    }
    return allSame;
  }

  function handleFullGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] !== "") {
          setFullGrid(true);
        } else {
          setFullGrid(false);
          return fullGrid;
        }
      }
    }
    return fullGrid;
  }

  React.useEffect(() => {
    handleWin(grid);
    handleFullGrid(grid);
  }, [grid]);

  const generateGrid = () => {
    return grid.map((row, i) => (
      <div key={i} className="grid-row">
        {row.map((cell, j) => (
          <div key={j} className="grid-item" onClick={() => handleClick(i, j)}>
            <span
              className={`grid-item-text cell-${cell}`}
              style={{
                color:
                  firstValues.firstUser === playFirst
                    ? cell === firstValues.firstAssignment
                      ? firstValues.firstColor
                      : secondValues.secondColor
                    : secondValues.secondUser === playFirst
                    ? cell === secondValues.secondAssignment
                      ? secondValues.secondColor
                      : firstValues.firstColor
                    : firstValues.firstColor,
              }}
            >
              {cell}
            </span>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="grid-div">
      {!equal && <div className="grid-container">{generateGrid(number)}</div>}
      {equal && (
        <div className="grid-message">
          <span className="text-span">{message.text}</span>
          <span className="icon-span">{message.icon}</span>
        </div>
      )}
      {!equal && fullGrid && (
        <span className="text-span">Grid is full, Please restart !!!</span>
      )}
    </div>
  );
}

export default Grid;
