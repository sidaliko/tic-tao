import React from "react";
import "./App.css";

import "./styles/base.css";

import Grid from "./component/Grid/Grid";

import { icons, iconComponents } from "./shared/const";

function App() {
  const [lignNumber, setLignNumber] = React.useState("3");

  const [start, setStart] = React.useState(false);

  const [firstAssignment, setfirstAssignment] = React.useState("");
  const [secondAssignment, setSecondAssignment] = React.useState("");

  const [firstUser, setFirstUser] = React.useState("");
  const [secondUser, setSecondUser] = React.useState("");

  const [firstColor, setFirstColor] = React.useState("#000000");
  const [secondColor, setSecondColor] = React.useState("#dfdfdf");

  const [playFirst, setPlayFirst] = React.useState("");

  const [error, setError] = React.useState(() => {
    return firstColor === secondColor ? true : false;
  });

  function handleSubmit(event) {
    event.preventDefault();
    !error && setStart(true);
  }

  function handleReset() {
    setLignNumber("3");
    setFirstUser("");
    setSecondUser("");
    setfirstAssignment("");
    setSecondAssignment("");
    setPlayFirst("");
    setFirstColor("#000000");
    setSecondColor("#f5f5f5");
  }

  console.log(firstColor, secondColor, error);
  console.log(firstColor === secondColor);

  React.useEffect(
    () => (firstColor === secondColor ? setError(true) : setError(false)),
    [firstColor, secondColor]
  );
  return (
    <div className="App">
      {!start && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="lign-number-div">
            <label
              className="form-label"
              aria-label="lignNumber"
              htmlFor="lignNumber"
            >
              Choose number of lignes and columns:
            </label>
            <input
              id="lignNumber"
              type="number"
              required
              min="3"
              value={lignNumber}
              onChange={(event) => setLignNumber(event.target.value)}
              className="input"
            />
          </div>

          <div className="tic-tao-div">
            <label htmlFor="firstUser" className="form-label">
              First User Name:
            </label>
            <input
              className="input"
              id="firstUser"
              type="text"
              required
              value={firstUser}
              name="firstUser"
              onChange={(event) => setFirstUser(event.target.value)}
            />
            <div>
              <legend aria-label="firstAssignment">Choose assignement:</legend>

              <div>
                {icons.map((icon, index) => {
                  const IconComponent = iconComponents[icon.name];

                  return (
                    <div className="icon-div" key={icon.id}>
                      <input
                        className="radio"
                        type="radio"
                        id={`first-${icon.name}`}
                        name="first-user-assignement"
                        value={icon.name}
                        required
                        checked={firstAssignment === icon.name}
                        disabled={secondAssignment === icon.name}
                        onChange={(event) =>
                          setfirstAssignment(event.target.value)
                        }
                      />
                      <label htmlFor={`first-${icon.name}`}>
                        {IconComponent && (
                          <IconComponent
                            color={"#00000"}
                            height="30px"
                            width="30px"
                          />
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className="color-div">
                <label htmlFor="first-color">Choose color:</label>
                <input
                  className="color"
                  type="color"
                  id="first-color"
                  name="first-color"
                  required
                  value={firstColor}
                  onChange={(event) => {
                    return (
                      setFirstColor(event.target.value),
                      firstColor === secondColor
                        ? setError(true)
                        : setError(false)
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className="tic-tao-div">
            <label htmlFor="secondUser" className="form-label">
              Second User Name:
            </label>
            <input
              className="input"
              id="secondUser"
              type="text"
              required
              value={secondUser}
              name="secondUser"
              onChange={(event) => setSecondUser(event.target.value)}
            />
            <div>
              <legend aria-label="secondAssignment">Choose assignement:</legend>
              <div>
                {icons.map((icon, index) => {
                  const IconComponent = iconComponents[icon.name];

                  return (
                    <div className="icon-div" key={icon.id}>
                      <input
                        className="radio"
                        type="radio"
                        id={`second-${icon.name}`}
                        name="second-user-assignement"
                        value={icon.name}
                        required
                        checked={secondAssignment === icon.name}
                        disabled={firstAssignment === icon.name}
                        onChange={(event) =>
                          setSecondAssignment(event.target.value)
                        }
                      />
                      <label htmlFor={`second-${icon.name}`}>
                        {IconComponent && (
                          <IconComponent
                            color={"#00000"}
                            height="30px"
                            width="30px"
                          />
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="color-div">
              <label htmlFor="second-color">Choose color:</label>
              <input
                className="color"
                type="color"
                id="second-color"
                name="second-color"
                required
                value={secondColor}
                error={firstColor === secondColor}
                onChange={(event) => {
                  return (
                    setSecondColor(event.target.value),
                    firstColor === secondColor
                      ? setError(true)
                      : setError(false)
                  );
                }}
              />
            </div>
          </div>

          {firstUser !== "" &&
            secondUser !== "" &&
            firstAssignment !== "" &&
            secondAssignment !== "" && (
              <div className="tic-tao-div">
                <legend aria-label="firstAssignment">Who play first:</legend>
                <div>
                  <input
                    className="radio"
                    type="radio"
                    id="play-first-user"
                    name="play-first"
                    value={firstUser}
                    required
                    checked={playFirst === firstUser}
                    onChange={(event) => setPlayFirst(event.target.value)}
                  />
                  <label htmlFor="play-first-user">{firstUser}</label>
                </div>
                <div>
                  <input
                    className="radio"
                    type="radio"
                    id="play-second-user"
                    name="play-first"
                    value={secondUser}
                    required
                    checked={playFirst === secondUser}
                    onChange={(event) => setPlayFirst(event.target.value)}
                  />
                  <label htmlFor="play-second-user">{secondUser}</label>
                </div>
              </div>
            )}

          <button className="button" type="submit">
            Start Game
          </button>
        </form>
      )}
      {start && (
        <Grid
          number={Number(lignNumber)}
          firstValues={{ firstAssignment, firstUser, firstColor }}
          secondValues={{ secondAssignment, secondUser, secondColor }}
          playFirst={playFirst}
        />
      )}

      {start && (
        <div className="button-div">
          <button
            className="button button-restart"
            onClick={() => {
              setStart(false);
              handleReset();
            }}
          >
            Restart Settings
          </button>
          <button
            className="button button-restart"
            onClick={() => {
              setStart(false);
            }}
          >
            Restart Game
          </button>
        </div>
      )}

      {error && (
        <span className="text-span error">
          First Color should be different from Second Color
        </span>
      )}
    </div>
  );
}

export default App;
