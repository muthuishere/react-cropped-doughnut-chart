export const thicknessWithRatio = {
  XXL: 150,
  XL: 125,
  L: 100,
  M: 50,
  S: 35
};

export const sizeWithAngles = {
  XXL: [261, 460],
  XL: [241, 480],
  L: [221, 500],
  M: [201, 520],
  S: [181, 540]
};
export const colors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#8B00FF"
];


export const  chartStyles = `

.horse-chart-tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: cornsilk transparent transparent transparent;
}
.tooltip-animation-on
{
    display: block;

    -webkit-animation: fadeInFromNone 0.5s ease-out;
    -moz-animation: fadeInFromNone 0.5s ease-out;
    -o-animation: fadeInFromNone 0.5s ease-out;
    animation: fadeInFromNone 0.5s ease-out;
}
@keyframes fadeInFromNone {
    0% {
        display: none;
        opacity: 0;
    }

    1% {
        display: block;
        opacity: 0;
    }

    100% {
        display: block;
        opacity: 1;
    }
}
.tooltip-animation-off
{
    display: block;

    -webkit-animation: fadeOutFromNone 0.5s ease-out;
    -moz-animation: fadeOutFromNone 0.5s ease-out;
    -o-animation: fadeOutFromNone 0.5s ease-out;
    animation: fadeOutFromNone 0.5s ease-out;
}
@keyframes fadeOutFromNone {
    0% {
        display: block;
        opacity: 1;
    }

    1% {
        display: block;
        opacity: 0;
    }

    100% {
        display: none;
        opacity: 1;
    }
}

  a:hover .path-container {
    cursor: pointer;
    transition: all 0.5s ease;
   filter:url(#glowfilter) brightness(1.0);
  }

  a:hover text {
    transition: all 0.5s ease;
    cursor: pointer;
    font-weight: bold;
  }
  a text {
    transition: all 0.5s ease;
    filter: ;
    cursor: pointer;
  }
    a .path-container {

      transition: all 0.5s ease;
      filter: brightness(0.7);
    }

  foreignObject {
    cursor: pointer;
  }

`
